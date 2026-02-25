"""Account service for retrieving account information."""

from typing import Dict, Any, Optional, List

from app.core.client import BaseClient
from app.utils.logger import logger, truncate_response


class AccountService:
    """Service for account-related API operations."""
    
    def __init__(self, client: BaseClient):
        """Initialize the account service.
        
        Args:
            client: BaseClient instance for making API requests
        """
        self.client = client
        logger.info("AccountService initialized")
    
    # ==================== Account Info ====================
    
    def get_assets(self) -> Dict[str, Any]:
        """Get account assets information.
        
        Calls:
            GET /fapi/v1/private/account/assets
        
        Returns:
            Dictionary containing account assets information
        """
        response = self.client.get("/fapi/v1/private/account/assets")
        logger.debug(f"Assets response: {truncate_response(str(response))}")
        return response
    
    def get_available_languages(self) -> Dict[str, Any]:
        """Get available languages for the platform.
        
        Calls:
            GET /uc/user_api/page_lang/available
        
        Returns:
            Dictionary containing available languages
        """
        response = self.client.get("/uc/user_api/page_lang/available")
        logger.debug(f"Languages response: {truncate_response(str(response))}")
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
        response = self.client.get("/uc/user_api/user_info")
        logger.debug(f"User info response: {truncate_response(str(response))}")
        return response
    
    # ==================== Asset Transfer ====================
    
    def transfer(
        self,
        from_wallet: str,
        to_wallet: str,
        currency: str,
        amount: str
    ) -> Dict[str, Any]:
        """Transfer funds between wallets.
        
        Calls:
            POST /api/platform/asset/api/asset/transfer
        
        Args:
            from_wallet: Source wallet (e.g., "MAIN", "SPOT", "SWAP", "FUTURES")
            to_wallet: Destination wallet (e.g., "MAIN", "SPOT", "SWAP", "FUTURES")
            currency: Currency code (e.g., "USDT", "BTC", "ETH")
            amount: Amount to transfer as string or number
        
        Returns:
            Dictionary containing transfer result
        """
        payload = {
            "from": from_wallet,
            "to": to_wallet,
            "currency": currency,
            "amount": str(amount)
        }
        response = self.client.post("/api/platform/asset/api/asset/transfer", json=payload)
        logger.debug(f"Transfer response: {truncate_response(str(response))}")
        return response
