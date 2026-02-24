"""Market data service for retrieving market information."""

from typing import Dict, Any, Optional

from app.core.client import BaseClient
from app.utils.logger import logger


class MarketService:
    """Service for market-related API operations."""
    
    def __init__(self, client: BaseClient):
        """Initialize the market service.
        
        Args:
            client: BaseClient instance for making API requests
        """
        self.client = client
        logger.info("MarketService initialized")
    
    def get_contract_ticker(self, symbol: str) -> Dict[str, Any]:
        """Get contract ticker information.
        
        Calls:
            GET /fapi/v1/contract/ticker
        
        Args:
            symbol: Trading symbol (e.g., "ETH_USDT")
        
        Returns:
            Dictionary containing contract ticker information (price, 24h change, volume, etc.)
        """
        logger.info(f"Fetching contract ticker for {symbol}")
        
        params = {"symbol": symbol}
        
        response = self.client.get("/fapi/v1/contract/ticker", params=params)
        logger.debug(f"Contract ticker response: {response}")
        return response
