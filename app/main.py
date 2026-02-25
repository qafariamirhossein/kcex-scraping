"""Main entry point for the crypto trading bot."""

import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import config
from app.core.client import BaseClient
from app.services.account import AccountService
from app.services.market import MarketService
from app.services.futures import FuturesService
from app.services.orders import OrderService
from app.utils.logger import logger


def test_endpoint(func, *args, **kwargs):
    """Test an endpoint and handle errors gracefully."""
    try:
        return func(*args, **kwargs)
    except Exception as e:
        logger.warning(f"Endpoint failed: {func.__name__} - {e}")
        return {"success": False, "error": str(e)}


def main():
    """Main function to run the trading bot."""
    logger.info("Starting kcex-bot")
    
    if not config.KCEX_AUTH_TOKEN:
        logger.error("KCEX_AUTH_TOKEN not configured. Please set it in .env")
        return
    
    # Initialize the base client
    client = BaseClient(timeout=config.HTTP_TIMEOUT)
    
    try:
        # Initialize all services
        account_service = AccountService(client)
        market_service = MarketService(client)
        futures_service = FuturesService(client)
        order_service = OrderService(client)
        
        # ==================== Account Service Tests ====================
        logger.info("Fetching user info...")
        user_info = test_endpoint(account_service.get_user_info)
        
        print("=" * 50)
        print("User Info Response:")
        print(user_info)
        print("=" * 50)
        
        # Get account assets
        logger.info("Fetching account assets...")
        assets = test_endpoint(account_service.get_assets)
        
        print("\n" + "=" * 50)
        print("Account Assets Response:")
        print(assets)
        print("=" * 50)
        
        # Get available languages
        logger.info("Fetching available languages...")
        languages = test_endpoint(account_service.get_available_languages)
        
        print("\n" + "=" * 50)
        print("Available Languages Response:")
        print(languages)
        print("=" * 50)
        
        # ==================== Market Service Tests ====================
        
        # Get contract ticker
        logger.info("Fetching ETH_USDT contract ticker...")
        ticker = test_endpoint(market_service.get_contract_ticker, "ETH_USDT")
        
        print("\n" + "=" * 50)
        print("Contract Ticker Response:")
        print(ticker)
        print("=" * 50)
        
        # Get all tickers
        logger.info("Fetching all contract tickers...")
        all_tickers = test_endpoint(market_service.get_all_tickers)
        
        print("\n" + "=" * 50)
        print("All Tickers Response:")
        print(all_tickers)
        print("=" * 50)
        
        # Get contract list
        logger.info("Fetching contract list...")
        contract_list = test_endpoint(market_service.get_contract_list)
        
        print("\n" + "=" * 50)
        print("Contract List Response:")
        print(contract_list)
        print("=" * 50)
        
        # Get leverage tiers
        logger.info("Fetching leverage tiers for BTCUSDT...")
        leverage_tiers = test_endpoint(market_service.get_leverage_tiers, "BTCUSDT")
        
        print("\n" + "=" * 50)
        print("Leverage Tiers Response:")
        print(leverage_tiers)
        print("=" * 50)
        
        # Get funding rate
        logger.info("Fetching funding rate for BTCUSDT...")
        funding_rate = test_endpoint(futures_service.get_funding_rate, "BTCUSDT")
        
        print("\n" + "=" * 50)
        print("Funding Rate Response:")
        print(funding_rate)
        print("=" * 50)
        

        

        

        
        # Get balance
        logger.info("Fetching futures balance...")
        balance = test_endpoint(futures_service.get_balance)
        
        print("\n" + "=" * 50)
        print("Futures Balance Response:")
        print(balance)
        print("=" * 50)
        
        # Get account info (uses assets endpoint)
        logger.info("Fetching futures account info...")
        futures_account_info = test_endpoint(futures_service.get_account_info)
        
        print("\n" + "=" * 50)
        print("Futures Account Info Response:")
        print(futures_account_info)
        print("=" * 50)
        
        
        
        # ==================== Test Order Placement (Optional) ====================
        
        # Test placing an order (will likely fail without proper params, but tests the endpoint)
        logger.info("Testing place_order endpoint...")
        try:
            order_result = test_endpoint(
                futures_service.place_order,
                symbol="BTCUSDT",
                side="BUY",
                position_side="LONG",
                order_type="MARKET",
                quantity=0.001
            )
            print("\n" + "=" * 50)
            print("Place Order Response:")
            print(order_result)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"Place order test failed: {e}")
        
        # Test cancel order
        logger.info("Testing cancel_order endpoint...")
        try:
            cancel_result = test_endpoint(
                futures_service.cancel_order,
                symbol="BTCUSDT",
                order_id=12345
            )
            print("\n" + "=" * 50)
            print("Cancel Order Response:")
            print(cancel_result)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"Cancel order test failed: {e}")
        
        # Test get history orders
        logger.info("Testing get_history_orders endpoint...")
        try:
            history_orders = test_endpoint(
                futures_service.get_history_orders,
                symbol="BTC_USDT",
                start_time=1769414966927,
                end_time=1772006966927
            )
            print("\n" + "=" * 50)
            print("History Orders Response:")
            print(history_orders)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"History orders test failed: {e}")
        

        
        # Test set leverage
        logger.info("Testing set_leverage endpoint...")
        try:
            leverage_result = test_endpoint(
                futures_service.set_leverage,
                symbol="BTCUSDT",
                leverage=10
            )
            print("\n" + "=" * 50)
            print("Set Leverage Response:")
            print(leverage_result)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"Set leverage test failed: {e}")
        
        # Test set margin type
        logger.info("Testing set_margin_type endpoint...")
        try:
            margin_result = test_endpoint(
                futures_service.set_margin_type,
                symbol="BTCUSDT",
                margin_type="CROSS"
            )
            print("\n" + "=" * 50)
            print("Set Margin Type Response:")
            print(margin_result)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"Set margin type test failed: {e}")
        
        # Test add margin
        logger.info("Testing add_margin endpoint...")
        try:
            add_margin_result = test_endpoint(
                futures_service.add_margin,
                symbol="BTCUSDT",
                margin=10,
                position_side="LONG"
            )
            print("\n" + "=" * 50)
            print("Add Margin Response:")
            print(add_margin_result)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"Add margin test failed: {e}")
        
        # Test set position mode
        logger.info("Testing set_position_mode endpoint...")
        try:
            pos_mode_result = test_endpoint(
                futures_service.set_position_mode,
                hedge_mode=True
            )
            print("\n" + "=" * 50)
            print("Set Position Mode Response:")
            print(pos_mode_result)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"Set position mode test failed: {e}")
        
        # Test get sys balances
        logger.info("Testing get_sys_balances endpoint...")
        try:
            sys_balances_result = test_endpoint(
                futures_service.get_sys_balances,
                sys="SWAP"
            )
            print("\n" + "=" * 50)
            print("Sys Balances Response:")
            print(sys_balances_result)
            print("=" * 50)
        except Exception as e:
            logger.warning(f"Sys balances test failed: {e}")
        
        print("\n" + "=" * 50)
        print("ALL ENDPOINTS TESTED SUCCESSFULLY!")
        print("(Some endpoints may have failed - check logs above)")
        print("=" * 50)
        
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise
    finally:
        client.close()
        logger.info("kcex-bot stopped")


if __name__ == "__main__":
    main()
