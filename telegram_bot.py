#!/usr/bin/env python3
"""Telegram bot for KCEX trading platform.

This bot provides convenient commands to access KCEX API functions
directly from Telegram.

Usage:
    python telegram_bot.py

Environment variables required:
    TELEGRAM_BOT_TOKEN - Your Telegram bot token from @BotFather
    KCEX_AUTH_TOKEN - Your KCEX authentication token
"""

import os
import sys
import json
import logging
from pathlib import Path
from typing import Optional

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes, ConversationHandler

from app.core.client import BaseClient
from app.services.account import AccountService
from app.services.market import MarketService
from app.services.futures import FuturesService
from app.services.orders import OrderService
from app.config import Config

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)

# Suppress httpx library logging (very verbose)
logging.getLogger("httpx").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)


# ==================== Bot States ====================

(SELECTING_ACTION, ENTERING_SYMBOL, ENTERING_SIDE, ENTERING_QUANTITY, 
 ENTERING_PRICE, ENTERING_LEVERAGE, ENTERING_WALLET_FROM, ENTERING_WALLET_TO,
 ENTERING_CURRENCY, ENTERING_AMOUNT) = range(10)


# ==================== Helper Functions ====================

def get_services():
    """Initialize and return all services."""
    client = BaseClient(timeout=30)
    account = AccountService(client)
    market = MarketService(client)
    futures = FuturesService(client)
    orders = OrderService(client)
    return client, account, market, futures, orders


def format_ticker(ticker: dict) -> str:
    """Format ticker information for display."""
    try:
        symbol = ticker.get("symbol", "N/A")
        last_price = ticker.get("lastPrice", ticker.get("price", "N/A"))
        change_24h = ticker.get("priceChangePercent", ticker.get("change24h", "N/A"))
        high_24h = ticker.get("high24h", "N/A")
        low_24h = ticker.get("low24h", "N/A")
        volume_24h = ticker.get("volume24h", ticker.get("turnover", "N/A"))
        
        emoji = "🟢" if float(change_24h) >= 0 else "🔴"
        
        return f"""📊 <b>{symbol}</b>
├ Price: {last_price}
├ Change: {emoji} {change_24h}%
├ 24h High: {high_24h}
├ 24h Low: {low_24h}
└ Volume: {volume_24h}"""
    except Exception as e:
        return f"Error formatting ticker: {e}\n\n{json.dumps(ticker, indent=2)}"


def format_balance(balance: dict) -> str:
    """Format balance information for display."""
    logger.info(f">>> format_balance() - Input: {balance}")
    try:
        if isinstance(balance, dict):
            logger.info(f">>> format_balance() - Dict keys: {balance.keys()}")
            # API returns data in "data" key, not "assets"
            assets = balance.get("data", [])
            logger.info(f">>> format_balance() - Assets list: {assets}")
            if not assets:
                return "No assets found"
            
            lines = ["💰 <b>Account Balance</b>\n"]
            for asset in assets:
                coin = asset.get("currency", "N/A")
                available = asset.get("availableBalance", asset.get("available", "0"))
                frozen = asset.get("frozenBalance", asset.get("frozen", "0"))
                total = asset.get("cashBalance", asset.get("equity", asset.get("total", "0")))
                lines.append(f"├ {coin}: {available} (Free) | {frozen} (Frozen) | {total} (Total)")
            
            return "\n".join(lines)
        return str(balance)
    except Exception as e:
        return f"Error formatting balance: {e}\n\n{json.dumps(balance, indent=2)}"


def format_funding(funding: dict) -> str:
    """Format funding rate information for display."""
    try:
        if isinstance(funding, dict):
            symbol = funding.get("symbol", "N/A")
            rate = funding.get("fundingRate", funding.get("funding_rate", "N/A"))
            next_funding = funding.get("nextFundingTime", funding.get("next_funding_time", "N/A"))
            
            return f"""💸 <b>Funding Rate - {symbol}</b>
├ Current Rate: {rate}%
└ Next Funding: {next_funding}"""
        return str(funding)
    except Exception as e:
        return f"Error formatting funding: {e}\n\n{json.dumps(funding, indent=2)}"


# ==================== Command Handlers ====================

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /start command."""
    welcome_message = """👋 <b>Welcome to KCEX Trading Bot!</b>

I'm here to help you access KCEX trading functions directly from Telegram.

<b>Available Commands:</b>
/help - Show all available commands
/account - Get account balance/assets
/user - Get user information
/ticker - Get contract ticker info
/tickers - Get all available tickers
/funding - Get funding rate for a symbol
/positions - Get open positions
/leverage - Get leverage tiers for a symbol
/place_order - Place a futures order
/close_position - Close a position
/set_leverage - Set leverage for a symbol
/transfer - Transfer funds between wallets
/order_deals - Get order deals/fills
/history_orders - Get historical orders
/open_position - Open a new position (single command)
/open_position - Open a new position (one command)

<b>Quick Tips:</b>
• Use /help to see detailed information about each command
• Most commands require symbol parameters
• All data is fetched in real-time from KCEX

<i>Happy trading! 🚀</i>"""
    
    await update.message.reply_html(welcome_message)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /help command with detailed help."""
    help_text = """📚 <b>Detailed Command Help</b>

<b>📊 Account Commands:</b>
/account - Display account balance and assets
/user - Get user profile information

<b>📈 Market Commands:</b>
/tickers - Get all available contract tickers
/ticker [symbol] - Get ticker for specific symbol
    Example: /ticker BTC_USDT
/funding [symbol] - Get funding rate
    Example: /funding BTCUSDT
/leverage [symbol] - Get leverage tiers
    Example: /leverage ETH_USDT
/ls_ratio [symbol] - Get long/short ratio
    Example: /ls_ratio BTCUSDT

<b>💼 Position Commands:</b>
/positions - Get all open positions
/place_order - Place a new futures order (interactive)
/close_position - Close an existing position (interactive)
/set_leverage - Set leverage for a symbol

<b>💰 Wallet Commands:</b>
/transfer - Transfer funds between wallets (interactive)

<b>🔧 Utility Commands:</b>
/ping - Test bot connectivity
/contracts - List all available contracts
/order_deals [symbol] [days] - Get order deals/fills
    Example: /order_deals TRUMP_USDT 30
/history_orders [symbol] [days] - Get historical orders
    Example: /history_orders TRUMP_USDT 30
/open_position [symbol] [side] [qty] [leverage] [price] - Open position
    Example: /open_position TRUMP_USDT LONG 1 20 3.427

<b>Notes:</b>
• Replace [symbol] with actual trading pair (e.g., BTC_USDT)
• Some commands are interactive and will guide you through
• All data is fetched in real-time from KCEX exchange"""
    
    await update.message.reply_html(help_text)


async def account_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /account command to get account balance."""
    await update.message.reply_text("🔄 Fetching account balance...")
    
    try:
        client, account, market, futures, orders = get_services()
        logger.info(">>> /account command - Calling account.get_assets()")
        result = account.get_assets()
        logger.info(f">>> /account command - Raw API response: {result}")
        response = format_balance(result)
        logger.info(f">>> /account command - Formatted response: {response}")
        client.close()
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching account: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)}")


async def user_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /user command to get user info."""
    await update.message.reply_text("🔄 Fetching user information...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = account.get_user_info()
        client.close()
        
        # Format user info
        try:
            if isinstance(result, dict):
                # Data is nested inside 'data' key
                data = result.get("data", {})
                
                # Extract all relevant fields
                user_id = data.get("uid", data.get("memberId", "N/A"))
                email = data.get("email", data.get("account", "N/A"))
                status = data.get("status", "N/A")
                kyc = data.get("kycStatus", "N/A")
                country_code = data.get("countryCode", "N/A")
                nickname = data.get("nickname", "N/A")
                auth_level = data.get("authLevel", "N/A")
                mobile = data.get("mobile", "N/A")
                invite_code = data.get("inviteCode", "N/A")
                is_agent = data.get("isAgent", "N/A")
                
                # Get KYC level info if available
                kyc_info = data.get("kycInfo", {})
                kyc_junior = kyc_info.get("junior")
                kyc_senior = kyc_info.get("senior")
                kyc_level1 = kyc_info.get("level1")
                kyc_level2 = kyc_info.get("level2")
                kyc_level3 = kyc_info.get("level3")
                max_auth_times = kyc_info.get("maxAuthTimes")
                
                # Format timestamps
                last_login = data.get("lastLoginTime")
                register_time = data.get("registerTime")
                
                # Convert timestamps if available
                import datetime
                last_login_str = "N/A"
                if last_login:
                    try:
                        last_login_str = datetime.datetime.fromtimestamp(last_login/1000).strftime('%Y-%m-%d %H:%M:%S')
                    except:
                        last_login_str = str(last_login)
                
                register_str = "N/A"
                if register_time:
                    try:
                        register_str = datetime.datetime.fromtimestamp(register_time/1000).strftime('%Y-%m-%d %H:%M:%S')
                    except:
                        register_str = str(register_time)
                
                # Build response with all available info
                response = f"""👤 <b>User Information</b>
├ ID: {user_id}
├ Email: {email}
├ Nickname: {nickname}
├ Status: {status}
├ Auth Level: {auth_level}
├ Mobile: {mobile}
├ Country Code: {country_code}
├ Invite Code: {invite_code}
├ Is Agent: {is_agent}
├ KYC Status: {kyc}
├ KYC Levels: L1={kyc_level1}%, L2={kyc_level2}%, L3={kyc_level3}%
├ KYC Max Auth Times: {max_auth_times}
├ Last Login: {last_login_str}
├ Register Time: {register_str}
└ Token: {data.get("userToken", "N/A")[:20]}..."""
            else:
                response = json.dumps(result, indent=2)
        except:
            response = json.dumps(result, indent=2)
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching user info: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)}")


async def tickers_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /tickers command to get all tickers."""
    await update.message.reply_text("🔄 Fetching all tickers...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = market.get_all_tickers()
        client.close()
        
        # Format tickers
        try:
            if isinstance(result, dict):
                tickers_list = result.get("data", result.get("result", []))
                if tickers_list:
                    # Show top 10 tickers
                    top_tickers = tickers_list[:10]
                    lines = ["📊 <b>Top Tickers</b>\n"]
                    for t in top_tickers:
                        symbol = t.get("symbol", "N/A")
                        price = t.get("lastPrice", t.get("price", "N/A"))
                        change = t.get("priceChangePercent", "0")
                        emoji = "🟢" if float(change) >= 0 else "🔴"
                        lines.append(f"{emoji} {symbol}: {price} ({change}%)")
                    
                    if len(tickers_list) > 10:
                        lines.append(f"\n... and {len(tickers_list) - 10} more")
                    
                    response = "\n".join(lines)
                else:
                    response = "No tickers found"
            else:
                response = str(result)[:4000]  # Limit string length
        except Exception as e:
            logger.error(f"Error formatting: {e}")
            response = f"Error formatting: {str(e)[:200]}"
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching tickers: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)[:500]}")


async def ticker_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /ticker command to get specific ticker."""
    # Check if symbol was provided
    if not context.args:
        await update.message.reply_text(
            "ℹ️ Usage: /ticker [symbol]\nExample: /ticker BTC_USDT"
        )
        return
    
    symbol = context.args[0].upper()
    await update.message.reply_text(f"🔄 Fetching ticker for {symbol}...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = market.get_contract_ticker(symbol)
        client.close()
        
        response = format_ticker(result)
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching ticker: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)}")


async def funding_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /funding command to get funding rate."""
    if not context.args:
        await update.message.reply_text(
            "ℹ️ Usage: /funding [symbol]\nExample: /funding BTCUSDT"
        )
        return
    
    symbol = context.args[0].upper()
    await update.message.reply_text(f"🔄 Fetching funding rate for {symbol}...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = futures.get_funding_rate(symbol)
        client.close()
        
        response = format_funding(result)
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching funding: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)}")


async def leverage_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /leverage command to get leverage tiers."""
    if not context.args:
        await update.message.reply_text(
            "ℹ️ Usage: /leverage [symbol]\nExample: /leverage ETH_USDT"
        )
        return
    
    symbol = context.args[0].upper()
    await update.message.reply_text(f"🔄 Fetching leverage tiers for {symbol}...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = futures.get_leverage_tiers(symbol)
        client.close()
        
        try:
            if isinstance(result, dict):
                tiers = result.get("data", result.get("tiers", []))
                if tiers:
                    lines = [f"📈 <b>Leverage Tiers - {symbol}</b>\n"]
                    for tier in tiers[:5]:  # Show first 5 tiers
                        min_notional = tier.get("minNotional", "N/A")
                        max_notional = tier.get("maxNotional", "N/A")
                        leverage = tier.get("leverage", "N/A")
                        lines.append(f"├ {leverage}x: {min_notional} - {max_notional}")
                    
                    if len(tiers) > 5:
                        lines.append(f"└ ... and {len(tiers) - 5} more tiers")
                    
                    response = "\n".join(lines)
                else:
                    response = "No leverage tiers found"
            else:
                response = str(result)[:4000]  # Limit string length
        except Exception as e:
            logger.error(f"Error formatting leverage tiers: {e}")
            response = f"Error: {str(e)[:200]}"
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching leverage: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)[:500]}")


async def positions_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /positions command to get open positions."""
    await update.message.reply_text("🔄 Fetching open positions...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = futures.get_account_info()
        client.close()
        
        try:
            if isinstance(result, dict):
                positions = result.get("positions", [])
                if positions:
                    lines = ["📊 <b>Open Positions</b>\n"]
                    for pos in positions:
                        symbol = pos.get("symbol", "N/A")
                        side = pos.get("positionSide", pos.get("side", "N/A"))
                        qty = pos.get("positionAmt", pos.get("qty", "N/A"))
                        entry = pos.get("entryPrice", "N/A")
                        pnl = pos.get("unRealizedProfit", "N/A")
                        lines.append(f"├ {symbol} ({side}): {qty} @ {entry} | PnL: {pnl}")
                    
                    response = "\n".join(lines)
                else:
                    response = "No open positions"
            else:
                response = str(result)[:4000]  # Limit string length
        except Exception as e:
            logger.error(f"Error formatting positions: {e}")
            response = f"Error: {str(e)[:200]}"
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching positions: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)[:500]}")


async def ls_ratio_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /ls_ratio command to get long/short ratio."""
    if not context.args:
        await update.message.reply_text(
            "ℹ️ Usage: /ls_ratio [symbol] [period]\nExample: /ls_ratio BTCUSDT 1h"
        )
        return
    
    symbol = context.args[0].upper()
    period = context.args[1] if len(context.args) > 1 else "1h"
    
    await update.message.reply_text(f"🔄 Fetching L/S ratio for {symbol}...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = market.get_global_long_short_ratio(symbol, period)
        client.close()
        
        try:
            if isinstance(result, dict):
                ratio = result.get("ratio", result.get("data", {}).get("ratio", "N/A"))
                long_ratio = result.get("longShortRatio", result.get("data", {}).get("longShortRatio", "N/A"))
                emoji = "🐂" if float(long_ratio or ratio or 0) > 0.5 else "🐻"
                
                response = f"""📊 <b>Long/Short Ratio - {symbol}</b>
├ Period: {period}
├ Ratio: {long_ratio or ratio}
└ Trend: {emoji} {"Bullish" if float(long_ratio or ratio or 0) > 0.5 else "Bearish"}"""
            else:
                response = str(result)[:4000]  # Limit string length
        except Exception as e:
            logger.error(f"Error formatting ls ratio: {e}")
            response = f"Error: {str(e)[:200]}"
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching ls ratio: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)[:500]}")


async def contracts_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /contracts command to list available contracts."""
    await update.message.reply_text("🔄 Fetching available contracts...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = market.get_contract_list()
        client.close()
        
        try:
            if isinstance(result, dict):
                contracts = result.get("data", result.get("contracts", []))
                if contracts:
                    lines = ["📄 <b>Available Contracts</b>\n"]
                    # Show first 20 contracts
                    for contract in contracts[:20]:
                        symbol = contract.get("symbol", "N/A")
                        status = contract.get("status", "N/A")
                        lines.append(f"├ {symbol} ({status})")
                    
                    if len(contracts) > 20:
                        lines.append(f"\n... and {len(contracts) - 20} more contracts")
                    
                    response = "\n".join(lines)
                else:
                    response = "No contracts found"
            else:
                response = str(result)[:4000]  # Limit string length
        except Exception as e:
            logger.error(f"Error formatting contracts: {e}")
            response = f"Error: {str(e)[:200]}"
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching contracts: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)[:500]}")


async def ping_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /ping command to test connectivity."""
    import time
    start = time.time()
    
    try:
        client, account, market, futures, orders = get_services()
        # Try a simple API call
        account.get_available_languages()
        client.close()
        
        latency = round((time.time() - start) * 1000, 2)
        await update.message.reply_text(f"✅ Bot is online!\nLatency: {latency}ms")
    except Exception as e:
        await update.message.reply_text(f"❌ Connection error: {str(e)}")


import requests
import hashlib
import time


# =========================
# SIGN LIKE BROWSER - EXACT ALGORITHM
# =========================
def generate_signature(auth_token: str, timestamp: int, body: dict) -> str:
    # Step 1: B = md5(auth_token + timestamp).substr(7)
    token_ts = auth_token + str(timestamp)
    B = hashlib.md5(token_ts.encode('utf-8')).hexdigest()[7:]
    
    # Step 2: bodyString = JSON.stringify(body) - default separators (space after colon)
    body_string = json.dumps(body)
    
    # Step 3: sign = md5(timestamp + bodyString + B)
    sign_input = str(timestamp) + body_string + B
    sign = hashlib.md5(sign_input.encode('utf-8')).hexdigest()
    
    return sign


async def open_position_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /open_position command to open a position in one command.
    
    Usage: /open_position [symbol] [side] [quantity] [leverage] [price]
    Example: /open_position TRUMP_USDT LONG 1 20 3.427
    
    Side: LONG or SHORT
    """
    # Check if all required args were provided
    if len(context.args) < 5:
        await update.message.reply_text(
            "ℹ️ Usage: /open_position [symbol] [side] [quantity] [leverage] [price] [stop_loss] [take_profit]\n\n"
            "Example: /open_position TRUMP_USDT LONG 1 20 3.427 3.331 3.394\n\n"
            "• symbol: Trading pair (e.g., TRUMP_USDT)\n"
            "• side: LONG or SHORT\n"
            "• quantity: Order volume\n"
            "• leverage: Leverage level (e.g., 20)\n"
            "• price: Order price\n"
            "• stop_loss: Stop loss price (optional)\n"
            "• take_profit: Take profit price (optional)\n\n"
            "Type: LIMIT order"
        )
        return
    
    symbol = context.args[0].upper()
    side_input = context.args[1].upper()
    quantity = context.args[2]
    leverage = context.args[3]
    price = context.args[4]
    
    # Optional stop loss and take profit
    stop_loss = context.args[5] if len(context.args) > 5 else None
    take_profit = context.args[6] if len(context.args) > 6 else None
    
    # Map side to API values: 1=LONG (BUY_OPEN), 3=SHORT (SELL_OPEN)
    # Accept both LONG/SHORT and BUY/SELL for backward compatibility
    if side_input in ("LONG", "BUY"):
        side = 1
        side_display = "LONG"
    else:  # SHORT or SELL
        side = 3  # Use 3 for SHORT (SELL_OPEN)
        side_display = "SHORT"
    
    # Build status message
    status_msg = (
        f"🔄 Opening position...\n"
        f"• Symbol: {symbol}\n"
        f"• Side: {side_display}\n"
        f"• Quantity: {quantity}\n"
        f"• Leverage: {leverage}x\n"
        f"• Price: {price}"
    )
    if stop_loss:
        status_msg += f"\n• Stop Loss: {stop_loss}"
    if take_profit:
        status_msg += f"\n• Take Profit: {take_profit}"
    
    await update.message.reply_text(status_msg)
    
    # Get auth token from config
    auth_token = Config.KCEX_AUTH_TOKEN
    if not auth_token:
        await update.message.reply_text("❌ Error: KCEX_AUTH_TOKEN not configured")
        return
    
    logger.info(f"Open position request - symbol: {symbol}, side: {side_display}, quantity: {quantity}, leverage: {leverage}, price: {price}, stop_loss: {stop_loss}, take_profit: {take_profit}")
    
    # Use bboPriceType 1 if no SL/TP, otherwise use 0 (BBO orders don't support SL/TP)
    bbo_price_type = 1 if not stop_loss and not take_profit else 0
    
    # Build payload exactly like browser
    payload = {
        "symbol": symbol,
        "side": side,
        "openType": 1,
        "type": 1,  # limit order
        "vol": float(quantity),
        "leverage": int(leverage),
        "marketCeiling": 0,
        "price": str(price),
        "priceProtect": 0,
        "bboPriceType": bbo_price_type,
    }
    
    # Add stop loss and take profit if provided
    if stop_loss:
        payload["stopLossPrice"] = str(stop_loss)
        payload["lossTrend"] = "1"
    if take_profit:
        payload["takeProfitPrice"] = str(take_profit)
        payload["profitTrend"] = "1"
    
    logger.info(f"Order payload: {json.dumps(payload)}")
    
    # Generate signature
    content_time = int(time.time() * 1000)
    sign = generate_signature(auth_token, content_time, payload)
    
    url = "https://www.kcex.com/fapi/v1/private/order/create"
    
    headers = {
        "accept": "*/*",
        "accept-language": "en-US",
        "accept-timezone": "UTC+03:30",
        "authorization": auth_token,
        "content-type": "application/json",
        "content-sign": sign,
        "content-time": str(content_time),
        "language": "en-US",
        "origin": "https://www.kcex.com",
        "platform": "WEB",
        "referer": f"https://www.kcex.com/futures/exchange/{symbol}?type=linear_swap",
        "user-agent": "Mozilla/5.0",
        "version": "1.0.0",
    }
    
    try:
        logger.info(f"Sending order request to {url}")
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        logger.info(f"Response status: {response.status_code}, body: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get("code") == 0 or result.get("success"):
                # Build success message
                success_msg = (
                    f"✅ <b>Position Opened!</b>\n\n"
                    f"├ Symbol: {symbol}\n"
                    f"├ Side: {side_display}\n"
                    f"├ Quantity: {quantity}\n"
                    f"├ Leverage: {leverage}x\n"
                    f"├ Price: {price}"
                )
                if stop_loss:
                    success_msg += f"\n├ Stop Loss: {stop_loss}"
                if take_profit:
                    success_msg += f"\n├ Take Profit: {take_profit}"
                success_msg += f"\n└ Order ID: {result.get('data', {}).get('orderId', 'N/A')}\n\n<code>{json.dumps(result, indent=2)}</code>"
                
                await update.message.reply_html(success_msg)
            else:
                await update.message.reply_text(
                    f"❌ Order failed: {result.get('msg', result.get('message', 'Unknown error'))}"
                )
        else:
            await update.message.reply_text(
                f"❌ HTTP Error: {response.status_code}\n{response.text[:500]}"
            )
    except Exception as e:
        logger.error(f"Open position error: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)}")


async def order_deals_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /order_deals command to get order deals/fills."""
    # Check if symbol was provided
    if not context.args:
        await update.message.reply_text(
            "ℹ️ Usage: /order_deals [symbol] [days]\n"
            "Example: /order_deals TRUMP_USDT 30\n\n"
            "Defaults to 30 days if not specified"
        )
        return
    
    symbol = context.args[0].upper()
    days = int(context.args[1]) if len(context.args) > 1 else 30
    
    # Calculate timestamps (milliseconds)
    import time
    end_time = int(time.time() * 1000)
    start_time = end_time - (days * 24 * 60 * 60 * 1000)
    
    await update.message.reply_text(f"🔄 Fetching order deals for {symbol} (last {days} days)...")
    
    # Side mapping: 1=BUY, 2=SELL, 3=CLOSE_LONG, 4=CLOSE_SHORT
    side_map = {1: "BUY", 2: "SELL", 3: "CLOSE_LONG", 4: "CLOSE_SHORT"}
    
    try:
        client, account, market, futures, orders = get_services()
        result = orders.get_order_history(symbol, start_time, end_time)
        client.close()
        
        # Format the response
        try:
            if isinstance(result, dict):
                data = result.get("data", result.get("result", []))
                if data:
                    lines = [f"📋 <b>Order Deals for {symbol}</b>\n"]
                    # Show up to 20 deals
                    for deal in data[:20]:
                        order_id = deal.get("orderId", "N/A")[:10] + "..." if len(deal.get("orderId", "")) > 10 else deal.get("orderId", "N/A")
                        deal_id = deal.get("id", "N/A")
                        price = deal.get("price", "N/A")
                        qty = deal.get("vol", deal.get("quantity", "N/A"))
                        side = deal.get("side", 0)
                        side_str = side_map.get(side, str(side))
                        emoji = "🟢" if side in [1, 3] else "🔴"
                        lines.append(f"{emoji} {side_str} | {qty} @ {price} | Deal: {deal_id}")
                    
                    if len(data) > 20:
                        lines.append(f"\n... and {len(data) - 20} more deals")
                    
                    response = "\n".join(lines)
                else:
                    response = f"No order deals found for {symbol}"
            else:
                response = str(result)[:4000]  # Limit string length
        except Exception as e:
            logger.error(f"Error formatting order deals: {e}")
            response = f"Error formatting: {str(e)[:200]}"
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching order deals: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)[:500]}")


async def history_orders_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /history_orders command to get historical orders."""
    # Check if symbol was provided
    if not context.args:
        await update.message.reply_text(
            "ℹ️ Usage: /history_orders [symbol] [days]\n"
            "Example: /history_orders TRUMP_USDT 30\n\n"
            "Defaults to 30 days if not specified"
        )
        return
    
    symbol = context.args[0].upper()
    days = int(context.args[1]) if len(context.args) > 1 else 30
    
    # Calculate timestamps (milliseconds)
    import time
    end_time = int(time.time() * 1000)
    start_time = end_time - (days * 24 * 60 * 60 * 1000)
    
    await update.message.reply_text(f"🔄 Fetching history orders for {symbol} (last {days} days)...")
    
    try:
        client, account, market, futures, orders = get_services()
        result = futures.get_history_orders(symbol, start_time, end_time)
        client.close()
        
        # Format the response
        try:
            if isinstance(result, dict):
                data = result.get("data", result.get("result", []))
                if data:
                    lines = [f"📋 <b>History Orders for {symbol}</b>\n"]
                    # Show up to 15 orders
                    for order in data[:15]:
                        order_id = order.get("orderId", "N/A")
                        
                        # side: 1 = BUY, 2 = SELL
                        side_num = order.get("side", "N/A")
                        if side_num == 1:
                            side = "BUY"
                            emoji = "🟢"
                        elif side_num == 2:
                            side = "SELL"
                            emoji = "🔴"
                        elif side_num == 3:
                            side = "BUY"
                            emoji = "🟢"
                        elif side_num == 4:
                            side = "SELL"  
                            emoji = "🔴"
                        else:
                            side = str(side_num) if side_num != "N/A" else "?"
                            emoji = "⚪"
                        
                        # Use 'vol' for quantity (not 'qty')
                        qty = order.get("vol", order.get("dealVol", "N/A"))
                        price = order.get("price", order.get("dealAvgPrice", "N/A"))
                        
                        # state: 3 = filled/completed
                        state = order.get("state", "N/A")
                        if state == 3:
                            status = "FILLED"
                            status_emoji = "✅"
                        elif state == 4:
                            status = "CANCELLED"
                            status_emoji = "❌"
                        elif state == 2:
                            status = "PARTIAL"
                            status_emoji = "⏳"
                        else:
                            status = str(state)
                            status_emoji = "⚪"
                        
                        lines.append(f"{emoji} {side} | {qty} @ {price} | {status_emoji} {status} | ID: {order_id}")
                    
                    if len(data) > 15:
                        lines.append(f"\n... and {len(data) - 15} more orders")
                    
                    response = "\n".join(lines)
                    
                    # Check if message is too long for Telegram (4096 chars limit)
                    if len(response) > 4000:
                        response = response[:4000] + "\n... (truncated)"
                else:
                    response = f"No history orders found for {symbol}"
            else:
                response = str(result)[:4000]  # Limit string length
        except Exception as e:
            # Don't include full result in error message to avoid "Message too long"
            logger.error(f"Error formatting history orders: {e}")
            response = f"Error formatting response: {str(e)[:200]}"
        
        await update.message.reply_html(response)
    except Exception as e:
        logger.error(f"Error fetching history orders: {e}")
        await update.message.reply_text(f"❌ Error: {str(e)[:500]}")


# ==================== Interactive Handlers ====================

async def transfer_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Start transfer conversation."""
    await update.message.reply_text(
        "💰 <b>Transfer Funds</b>\n\n"
        "Please enter the source wallet (from_wallet):\n"
        "Options: MAIN, SPOT, SWAP, FUTURES\n\n"
        "Type /cancel to cancel."
    , parse_mode="HTML")
    return ENTERING_WALLET_FROM


async def transfer_from_wallet(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Get source wallet."""
    context.user_data["from_wallet"] = update.message.text.upper()
    await update.message.reply_text(
        "Now enter the destination wallet (to_wallet):\n"
        "Options: MAIN, SPOT, SWAP, FUTURES"
    )
    return ENTERING_WALLET_TO


async def transfer_to_wallet(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Get destination wallet."""
    context.user_data["to_wallet"] = update.message.text.upper()
    await update.message.reply_text("Enter the currency (e.g., USDT, BTC, ETH):")
    return ENTERING_CURRENCY


async def transfer_currency(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Get currency."""
    context.user_data["currency"] = update.message.text.upper()
    await update.message.reply_text("Enter the amount to transfer:")
    return ENTERING_AMOUNT


async def transfer_amount(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Execute transfer."""
    context.user_data["amount"] = update.message.text
    
    await update.message.reply_text("🔄 Processing transfer...")
    
    try:
        client, account, market, futures, orders = get_services()
        
        result = account.transfer(
            from_wallet=context.user_data["from_wallet"],
            to_wallet=context.user_data["to_wallet"],
            currency=context.user_data["currency"],
            amount=context.user_data["amount"]
        )
        client.close()
        
        await update.message.reply_html(
            f"✅ <b>Transfer Successful!</b>\n\n"
            f"├ From: {context.user_data['from_wallet']}\n"
            f"├ To: {context.user_data['to_wallet']}\n"
            f"├ Currency: {context.user_data['currency']}\n"
            f"└ Amount: {context.user_data['amount']}\n\n"
            f"<code>{json.dumps(result, indent=2)}</code>"
        )
    except Exception as e:
        logger.error(f"Transfer error: {e}")
        await update.message.reply_text(f"❌ Transfer failed: {str(e)}")
    
    return ConversationHandler.END


async def set_leverage_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Start set leverage conversation."""
    await update.message.reply_text(
        "📈 <b>Set Leverage</b>\n\n"
        "Please enter the trading symbol:\n"
        "Example: BTCUSDT, ETH_USDT\n\n"
        "Type /cancel to cancel."
    , parse_mode="HTML")
    return ENTERING_SYMBOL


async def set_leverage_symbol(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Get symbol for leverage."""
    context.user_data["symbol"] = update.message.text.upper()
    await update.message.reply_text(
        "Enter the leverage level:\n"
        "Example: 10, 20, 50, 100"
    )
    return ENTERING_LEVERAGE


async def set_leverage_execute(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Execute leverage change."""
    try:
        leverage = int(update.message.text)
    except ValueError:
        await update.message.reply_text("❌ Invalid leverage. Please enter a number.")
        return ENTERING_LEVERAGE
    
    await update.message.reply_text("🔄 Setting leverage...")
    
    try:
        client, account, market, futures, orders = get_services()
        
        result = futures.set_leverage(
            symbol=context.user_data["symbol"],
            leverage=leverage
        )
        client.close()
        
        await update.message.reply_html(
            f"✅ <b>Leverage Set!</b>\n\n"
            f"├ Symbol: {context.user_data['symbol']}\n"
            f"└ Leverage: {leverage}x\n\n"
            f"<code>{json.dumps(result, indent=2)}</code>"
        )
    except Exception as e:
        logger.error(f"Set leverage error: {e}")
        await update.message.reply_text(f"❌ Failed: {str(e)}")
    
    return ConversationHandler.END


async def place_order_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Start place order conversation."""
    await update.message.reply_text(
        "📝 <b>Place Futures Order</b>\n\n"
        "Please enter the trading symbol:\n"
        "Example: BTCUSDT, ETH_USDT\n\n"
        "Type /cancel to cancel."
    , parse_mode="HTML")
    return ENTERING_SYMBOL


async def place_order_side(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Get order side."""
    context.user_data["symbol"] = update.message.text.upper()
    await update.message.reply_text(
        "Enter order side:\n"
        "BUY (long) or SELL (short)"
    )
    return ENTERING_SIDE


async def place_order_quantity(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Get order side and prompt for quantity."""
    context.user_data["side"] = update.message.text.upper()
    await update.message.reply_text("Enter order quantity:")
    return ENTERING_QUANTITY


async def place_order_price(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Get quantity and prompt for price."""
    context.user_data["quantity"] = update.message.text
    await update.message.reply_text(
        "Enter order price (or type 'MARKET' for market order):"
    )
    return ENTERING_PRICE


async def place_order_execute(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Execute the order."""
    price_text = update.message.text.upper()
    is_market = price_text == "MARKET"
    price = None if is_market else price_text
    
    await update.message.reply_text("🔄 Placing order...")
    
    try:
        client, account, market, futures, orders = get_services()
        
        if is_market:
            result = futures.place_market_order(
                symbol=context.user_data["symbol"],
                side=context.user_data["side"],
                position_side="LONG" if context.user_data["side"] == "BUY" else "SHORT",
                quantity=float(context.user_data["quantity"])
            )
        else:
            result = futures.place_limit_order(
                symbol=context.user_data["symbol"],
                side=context.user_data["side"],
                position_side="LONG" if context.user_data["side"] == "BUY" else "SHORT",
                quantity=float(context.user_data["quantity"]),
                price=float(price)
            )
        
        client.close()
        
        await update.message.reply_html(
            f"✅ <b>Order Placed!</b>\n\n"
            f"├ Symbol: {context.user_data['symbol']}\n"
            f"├ Side: {context.user_data['side']}\n"
            f"├ Quantity: {context.user_data['quantity']}\n"
            f"├ Type: {'MARKET' if is_market else 'LIMIT'}\n"
            f"└ Price: {price or 'N/A'}\n\n"
            f"<code>{json.dumps(result, indent=2)}</code>"
        )
    except Exception as e:
        logger.error(f"Place order error: {e}")
        await update.message.reply_text(f"❌ Order failed: {str(e)}")
    
    return ConversationHandler.END


async def cancel_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Cancel conversation."""
    await update.message.reply_text("❌ Operation cancelled.")
    return ConversationHandler.END


async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle errors."""
    logger.error(f"Update {update} caused error {context.error}")
    if update and update.message:
        await update.message.reply_text("An error occurred. Please try again.")


# ==================== Main Function ====================

def main():
    """Run the bot."""
    # Get token from environment
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    
    if not token:
        logger.error("TELEGRAM_BOT_TOKEN not set!")
        print("ERROR: Please set TELEGRAM_BOT_TOKEN environment variable")
        print("You can get a token from @BotFather on Telegram")
        sys.exit(1)
    
    # Build application
    application = Application.builder().token(token).build()
    
    # Add command handlers
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("account", account_command))
    application.add_handler(CommandHandler("user", user_command))
    application.add_handler(CommandHandler("tickers", tickers_command))
    application.add_handler(CommandHandler("ticker", ticker_command))
    application.add_handler(CommandHandler("funding", funding_command))
    application.add_handler(CommandHandler("leverage", leverage_command))
    application.add_handler(CommandHandler("positions", positions_command))
    application.add_handler(CommandHandler("ls_ratio", ls_ratio_command))
    application.add_handler(CommandHandler("contracts", contracts_command))
    application.add_handler(CommandHandler("ping", ping_command))
    application.add_handler(CommandHandler("order_deals", order_deals_command))
    application.add_handler(CommandHandler("history_orders", history_orders_command))
    application.add_handler(CommandHandler("open_position", open_position_command))
    
    # Transfer conversation
    transfer_handler = ConversationHandler(
        entry_points=[CommandHandler("transfer", transfer_start)],
        states={
            ENTERING_WALLET_FROM: [MessageHandler(filters.TEXT & ~filters.COMMAND, transfer_from_wallet)],
            ENTERING_WALLET_TO: [MessageHandler(filters.TEXT & ~filters.COMMAND, transfer_to_wallet)],
            ENTERING_CURRENCY: [MessageHandler(filters.TEXT & ~filters.COMMAND, transfer_currency)],
            ENTERING_AMOUNT: [MessageHandler(filters.TEXT & ~filters.COMMAND, transfer_amount)],
        },
        fallbacks=[CommandHandler("cancel", cancel_command)],
    )
    application.add_handler(transfer_handler)
    
    # Set leverage conversation
    leverage_handler = ConversationHandler(
        entry_points=[CommandHandler("set_leverage", set_leverage_start)],
        states={
            ENTERING_SYMBOL: [MessageHandler(filters.TEXT & ~filters.COMMAND, set_leverage_symbol)],
            ENTERING_LEVERAGE: [MessageHandler(filters.TEXT & ~filters.COMMAND, set_leverage_execute)],
        },
        fallbacks=[CommandHandler("cancel", cancel_command)],
    )
    application.add_handler(leverage_handler)
    
    # Place order conversation
    order_handler = ConversationHandler(
        entry_points=[CommandHandler("place_order", place_order_start)],
        states={
            ENTERING_SYMBOL: [MessageHandler(filters.TEXT & ~filters.COMMAND, place_order_side)],
            ENTERING_SIDE: [MessageHandler(filters.TEXT & ~filters.COMMAND, place_order_quantity)],
            ENTERING_QUANTITY: [MessageHandler(filters.TEXT & ~filters.COMMAND, place_order_price)],
            ENTERING_PRICE: [MessageHandler(filters.TEXT & ~filters.COMMAND, place_order_execute)],
        },
        fallbacks=[CommandHandler("cancel", cancel_command)],
    )
    application.add_handler(order_handler)
    
    # Add error handler
    application.add_error_handler(error_handler)
    
    # Start polling
    logger.info("Starting Telegram bot...")
    print("🤖 Telegram bot is running!")
    print("Press Ctrl+C to stop")
    
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
