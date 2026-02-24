"""Main entry point for the crypto trading bot."""

import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import config
from app.core.client import BaseClient
from app.services.account import AccountService
from app.services.market import MarketService
from app.utils.logger import logger


def main():
    """Main function to run the trading bot."""
    logger.info("Starting kcex-bot")
    
    if not config.KCEX_AUTH_TOKEN:
        logger.error("KCEX_AUTH_TOKEN not configured. Please set it in .env")
        return
    
    # Initialize the base client
    client = BaseClient(timeout=config.HTTP_TIMEOUT)
    
    try:
        # Initialize services
        account_service = AccountService(client)
        market_service = MarketService(client)
        
        # Get account assets
        logger.info("Fetching account assets...")
        assets = account_service.get_assets()
        
        print("=" * 50)
        print("Account Assets Response:")
        print(assets)
        print("=" * 50)
        
        # Get contract ticker (futures market data)
        logger.info("Fetching ETH_USDT contract ticker...")
        ticker = market_service.get_contract_ticker("ETH_USDT")
        
        print("\n" + "=" * 50)
        print("Contract Ticker Response:")
        print(ticker)
        print("=" * 50)
        
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise
    finally:
        client.close()
        logger.info("kcex-bot stopped")


if __name__ == "__main__":
    main()
