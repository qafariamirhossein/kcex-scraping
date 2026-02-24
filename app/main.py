"""Main entry point for the crypto trading bot."""

import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import config
from app.core.client import BaseClient
from app.services.account import AccountService
from app.services.orders import OrderService
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
        order_service = OrderService(client)
        
        # Get account assets
        logger.info("Fetching account assets...")
        assets = account_service.get_assets()
        
        print("=" * 50)
        print("Account Assets Response:")
        print(assets)
        print("=" * 50)
        
        # Get available languages
        logger.info("Fetching available languages...")
        languages = account_service.get_available_languages()
        
        print("\n" + "=" * 50)
        print("Available Languages Response:")
        print(languages)
        print("=" * 50)
        
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise
    finally:
        client.close()
        logger.info("kcex-bot stopped")


if __name__ == "__main__":
    main()
