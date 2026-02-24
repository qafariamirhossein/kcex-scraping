"""Account service for retrieving account information."""

from typing import Dict, Any

from app.core.client import BaseClient
from app.utils.logger import logger


class AccountService:
    """Service for account-related API operations."""
    
    def __init__(self, client: BaseClient):
        """Initialize the account service.
        
        Args:
            client: BaseClient instance for making API requests
        """
        self.client = client
        logger.info("AccountService initialized")
    
    def get_assets(self) -> Dict[str, Any]:
        """Get account assets information.
        
        Calls:
            GET /fapi/v1/private/account/assets
        
        Returns:
            Dictionary containing account assets information
        """
        logger.info("Fetching account assets")
        response = self.client.get("/fapi/v1/private/account/assets")
        logger.debug(f"Assets response: {response}")
        return response
