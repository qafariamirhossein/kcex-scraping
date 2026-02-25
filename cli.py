#!/usr/bin/env python3
"""CLI tool for calling KCEX API methods from the terminal."""

import sys
import os
import argparse
import json

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.client import BaseClient
from app.services.account import AccountService
from app.services.market import MarketService
from app.services.futures import FuturesService
from app.services.orders import OrderService


# Service registry - maps service names to classes and their methods
SERVICES = {
    "account": {
        "class": AccountService,
        "methods": {
            "get_assets": {},
            "get_available_languages": {},
            "get_user_info": {},
            "transfer": {
                "args": ["from_wallet", "to_wallet", "currency", "amount"],
                "required": ["from_wallet", "to_wallet", "currency", "amount"]
            }
        }
    },
    "market": {
        "class": MarketService,
        "methods": {
            "get_contract_ticker": {"args": ["symbol"], "required": ["symbol"]},
            "get_all_tickers": {},
            "get_contract_list": {},
            "get_leverage_tiers": {"args": ["symbol"]},
            "get_market_snapshot": {"args": ["symbol", "interval"], "required": ["symbol", "interval"]},
            "get_top_long_short_position": {"args": ["symbol", "period"], "required": ["symbol"]},
            "get_top_long_short_ratio": {"args": ["symbol", "period"], "required": ["symbol"]},
            "get_global_long_short_ratio": {"args": ["symbol", "period"], "required": ["symbol"]}
        }
    },
    "futures": {
        "class": FuturesService,
        "methods": {
            "get_history_orders": {
                "args": ["symbol", "start_time", "end_time"],
                "required": ["symbol", "start_time", "end_time"]
            },
            "place_order": {
                "args": ["symbol", "side", "position_side", "order_type", "quantity"],
                "required": ["symbol", "side", "position_side", "order_type", "quantity"]
            },
            "cancel_order": {"args": ["symbol", "order_id", "client_order_id"], "required": ["symbol"]},
            "set_leverage": {"args": ["symbol", "leverage", "position_side"], "required": ["symbol", "leverage"]},
            "set_margin_type": {"args": ["symbol", "margin_type", "position_side"], "required": ["symbol", "margin_type"]},
            "add_margin": {"args": ["symbol", "margin", "position_side"], "required": ["symbol", "margin"]},
            "set_position_mode": {"args": ["hedge_mode", "position_side"], "required": ["hedge_mode"]},
            "get_sys_balances": {"args": ["sys"]},
            "get_balance": {"args": ["asset"]},
            "get_account_info": {},
            "get_funding_rate": {"args": ["symbol"], "required": ["symbol"]},
            "set_stop_loss": {
                "args": ["symbol", "side", "position_side", "quantity", "stop_price"],
                "required": ["symbol", "side", "position_side", "quantity", "stop_price"]
            },
            "set_take_profit": {
                "args": ["symbol", "side", "position_side", "quantity", "stop_price"],
                "required": ["symbol", "side", "position_side", "quantity", "stop_price"]
            },
            "close_position": {"args": ["symbol", "position_side"]},
            "place_limit_order": {
                "args": ["symbol", "side", "position_side", "quantity", "price"],
                "required": ["symbol", "side", "position_side", "quantity", "price"]
            },
            "place_market_order": {
                "args": ["symbol", "side", "position_side", "quantity"],
                "required": ["symbol", "side", "position_side", "quantity"]
            }
        }
    },
    "orders": {
        "class": OrderService,
        "methods": {
            "create_order": {
                "args": ["symbol", "side", "open_type", "order_type", "volume", "leverage", "price"],
                "required": ["symbol", "side"]
            },
            "close_position": {
                "args": ["symbol", "position_id", "side", "open_type", "order_type", "volume", "leverage", "price", "flash_close", "price_protect"],
                "required": ["symbol", "position_id", "side"]
            },
            "get_order_history": {"args": ["symbol", "start_time", "end_time"]}
        }
    }
}


def list_services():
    """List all available services and their methods."""
    print("\n=== Available Services ===\n")
    for service_name, service_info in SERVICES.items():
        print(f"📦 {service_name}")
        methods = service_info["methods"]
        for method_name, method_info in methods.items():
            args = method_info.get("args", [])
            required = method_info.get("required", [])
            if args:
                req_str = ", ".join(required) if required else "none"
                opt_str = ", ".join([a for a in args if a not in required]) if required else ", ".join(args)
                print(f"   └── {method_name}({req_str}) [optional: {opt_str}]")
            else:
                print(f"   └── {method_name}()")
        print()


def call_method(service_name: str, method_name: str, args: dict):
    """Call a specific method on a service."""
    if service_name not in SERVICES:
        print(f"❌ Error: Unknown service '{service_name}'")
        print("Run with --list to see available services")
        sys.exit(1)
    
    service_info = SERVICES[service_name]
    
    if method_name not in service_info["methods"]:
        print(f"❌ Error: Unknown method '{method_name}' on service '{service_name}'")
        print("Run with --list to see available methods")
        sys.exit(1)
    
    method_info = service_info["methods"][method_name]
    required_args = method_info.get("required", [])
    
    # Check required arguments
    missing = [arg for arg in required_args if arg not in args]
    if missing:
        print(f"❌ Error: Missing required arguments: {', '.join(missing)}")
        sys.exit(1)
    
    # Initialize client and service
    client = BaseClient(timeout=30)
    service_class = service_info["class"]
    service = service_class(client)
    
    try:
        # Get the method
        method = getattr(service, method_name)
        
        # Filter out None values from args
        filtered_args = {k: v for k, v in args.items() if v is not None}
        
        # Call the method
        print(f"\n🔄 Calling {service_name}.{method_name}...")
        print(f"   Args: {filtered_args}\n")
        
        result = method(**filtered_args)
        
        # Print result
        print("=" * 50)
        print("📥 Response:")
        print(json.dumps(result, indent=2))
        print("=" * 50)
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
    finally:
        client.close()


def main():
    parser = argparse.ArgumentParser(
        description="KCEX CLI - Call API methods from terminal",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # List all services and methods
  python cli.py --list

  # Get user info
  python cli.py account get_user_info

  # Get account assets
  python cli.py account get_assets

  # Get contract ticker
  python cli.py market get_contract_ticker --symbol ETH_USDT

  # Get all tickers
  python cli.py market get_all_tickers

  # Get funding rate
  python cli.py futures get_funding_rate --symbol BTCUSDT

  # Set leverage
  python cli.py futures set_leverage --symbol BTCUSDT --leverage 10

  # Place a market order
  python cli.py futures place_order --symbol BTCUSDT --side BUY --position_side LONG --order_type MARKET --quantity 0.001

  # Transfer funds
  python cli.py account transfer --from_wallet MAIN --to_wallet SWAP --currency USDT --amount 10
        """
    )
    
    parser.add_argument("--list", "-l", action="store_true", 
                        help="List all available services and methods")
    
    parser.add_argument("service", nargs="?", help="Service name (account, market, futures, orders)")
    parser.add_argument("method", nargs="?", help="Method name to call")
    
    # Add dynamic arguments for method parameters
    parser.add_argument("--symbol", type=str, help="Trading symbol")
    parser.add_argument("--side", type=str, help="Order side (BUY/SELL)")
    parser.add_argument("--position_side", type=str, help="Position side (LONG/SHORT/BOTH)")
    parser.add_argument("--order_type", type=str, help="Order type (LIMIT/MARKET/STOP)")
    parser.add_argument("--quantity", type=float, help="Order quantity")
    parser.add_argument("--price", type=float, help="Order price")
    parser.add_argument("--stop_price", type=float, help="Stop price")
    parser.add_argument("--leverage", type=int, help="Leverage level")
    parser.add_argument("--margin_type", type=str, help="Margin type (CROSS/ISOLATED)")
    parser.add_argument("--margin", type=float, help="Margin amount")
    parser.add_argument("--hedge_mode", type=lambda x: x.lower() == "true", help="Hedge mode (true/false)")
    parser.add_argument("--reduce_only", type=lambda x: x.lower() == "true", help="Reduce only (true/false)")
    parser.add_argument("--close_position", type=lambda x: x.lower() == "true", help="Close position (true/false)")
    parser.add_argument("--time_in_force", type=str, help="Time in force (GTC/IOC/FOK)")
    parser.add_argument("--interval", type=str, help="Kline interval (1m, 5m, 1h, 1d, etc.)")
    parser.add_argument("--period", type=str, help="Time period")
    parser.add_argument("--start_time", type=int, help="Start time in milliseconds")
    parser.add_argument("--end_time", type=int, help="End time in milliseconds")
    parser.add_argument("--category", type=int, help="Category")
    parser.add_argument("--states", type=int, help="Order states")
    parser.add_argument("--page_num", type=int, help="Page number")
    parser.add_argument("--page_size", type=int, help="Page size")
    parser.add_argument("--order_id", type=int, help="Order ID")
    parser.add_argument("--client_order_id", type=str, help="Client order ID")
    parser.add_argument("--asset", type=str, help="Asset symbol")
    parser.add_argument("--sys", type=str, help="System type")
    parser.add_argument("--from_wallet", type=str, help="Source wallet (MAIN, SPOT, SWAP, FUTURES)")
    parser.add_argument("--to_wallet", type=str, help="Destination wallet")
    parser.add_argument("--currency", type=str, help="Currency code")
    parser.add_argument("--amount", type=str, help="Amount to transfer")
    parser.add_argument("--open_type", type=int, help="Open type (1=open position)")
    parser.add_argument("--volume", type=int, help="Order volume")
    parser.add_argument("--position_id", type=int, help="Position ID to close")
    parser.add_argument("--flash_close", type=lambda x: x.lower() == "true", help="Flash close (true/false)")
    parser.add_argument("--price_protect", type=str, help="Price protect (0/1)")
    
    args = parser.parse_args()
    
    # Handle --list
    if args.list:
        list_services()
        return
    
    # Require service and method
    if not args.service or not args.method:
        parser.print_help()
        print("\n❌ Error: Please provide service and method names")
        print("   Or use --list to see available services")
        sys.exit(1)
    
    # Build args dict from command line - only include explicitly provided arguments
    method_args = {}
    
    # Only add arguments that were explicitly provided (not None)
    if args.symbol is not None:
        method_args["symbol"] = args.symbol
    if args.side is not None:
        method_args["side"] = args.side
    if args.position_side is not None:
        method_args["position_side"] = args.position_side
    if args.order_type is not None:
        method_args["order_type"] = args.order_type
    if args.quantity is not None:
        method_args["quantity"] = args.quantity
    if args.price is not None:
        method_args["price"] = args.price
    if args.stop_price is not None:
        method_args["stop_price"] = args.stop_price
    if args.leverage is not None:
        method_args["leverage"] = args.leverage
    if args.margin_type is not None:
        method_args["margin_type"] = args.margin_type
    if args.margin is not None:
        method_args["margin"] = args.margin
    if args.hedge_mode is not None:
        method_args["hedge_mode"] = args.hedge_mode
    if args.reduce_only is not None:
        method_args["reduce_only"] = args.reduce_only
    if args.close_position is not None:
        method_args["close_position"] = args.close_position
    if args.interval is not None:
        method_args["interval"] = args.interval
    if args.period is not None:
        method_args["period"] = args.period
    if args.start_time is not None:
        method_args["start_time"] = args.start_time
    if args.end_time is not None:
        method_args["end_time"] = args.end_time
    if args.category is not None:
        method_args["category"] = args.category
    if args.states is not None:
        method_args["states"] = args.states
    if args.page_num is not None:
        method_args["page_num"] = args.page_num
    if args.page_size is not None:
        method_args["page_size"] = args.page_size
    if args.order_id is not None:
        method_args["order_id"] = args.order_id
    if args.client_order_id is not None:
        method_args["client_order_id"] = args.client_order_id
    if args.asset is not None:
        method_args["asset"] = args.asset
    if args.sys is not None:
        method_args["sys"] = args.sys
    if args.from_wallet is not None:
        method_args["from_wallet"] = args.from_wallet
    if args.to_wallet is not None:
        method_args["to_wallet"] = args.to_wallet
    if args.currency is not None:
        method_args["currency"] = args.currency
    if args.amount is not None:
        method_args["amount"] = args.amount
    if args.open_type is not None:
        method_args["open_type"] = args.open_type
    if args.volume is not None:
        method_args["volume"] = args.volume
    if args.position_id is not None:
        method_args["position_id"] = args.position_id
    if args.flash_close is not None:
        method_args["flash_close"] = args.flash_close
    if args.price_protect is not None:
        method_args["price_protect"] = args.price_protect
    
    # Call the method
    call_method(args.service, args.method, method_args)


if __name__ == "__main__":
    main()
