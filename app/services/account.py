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
    
    def get_available_languages(self) -> Dict[str, Any]:
        """Get available languages for the platform.
        
        Calls:
            GET /uc/user_api/page_lang/available
        
        Returns:
            Dictionary containing available languages
        """
        logger.info("Fetching available languages")
        response = self.client.get("/uc/user_api/page_lang/available")
        logger.debug(f"Languages response: {response}")
        return response
    
    def get_user_info(self) -> Dict[str, Any]:
        """Get user account information.
        
        Calls:
            GET /uc/user_api/user_info
        
        Returns:
            Dictionary containing user information including:
            - User ID
            - Email
            - Account status
            - KYC status
            - Other profile details
        """
        logger.info("Fetching user info")
        response = self.client.get("/uc/user_api/user_info")
        logger.debug(f"User info response: {response}")
        return response
