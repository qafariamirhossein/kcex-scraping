"""Main entry point for the crypto trading bot."""

from app.config import config
from app.core.client import BaseClient
from app.services.account import AccountService
from app.services.orders import OrderService
from app.utils.logger import logger


def main():
    """Main function to run the trading bot."""
    logger.info("Starting kcex-bot")
    
    # Initialize the base client
    client = BaseClient(
        base_url=config.API_BASE_URL,
        timeout=config.HTTP_TIMEOUT
    )
    
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
        
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise
    finally:
        client.close()
        logger.info("kcex-bot stopped")


if __name__ == "__main__":
    main()
