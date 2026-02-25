"""Order service for managing orders."""

from typing import Dict, Any, Optional, List

from app.core.client import BaseClient
from app.utils.logger import logger, truncate_response


class OrderService:
    """Service for order-related API operations."""
    
    def __init__(self, client: BaseClient):
        """Initialize the order service.
        
        Args:
            client: BaseClient instance for making API requests
        """
        self.client = client
        logger.info("OrderService initialized")
    
    # ==================== Order History ====================
    
    def get_order_history(
        self,
        symbol: str,
        start_time: Optional[int] = None,
        end_time: Optional[int] = None
    ) -> Dict[str, Any]:
        """Get order history.
        
        Calls:
            GET /fapi/v1/private/order/list/order_deals
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            start_time: Start time in milliseconds (optional)
            end_time: End time in milliseconds (optional)
        
        Returns:
            Dictionary containing order history
        """
        response = self.client.get("/fapi/v1/private/order/list/order_deals", params=params)
        logger.debug(f"Order history response: {truncate_response(str(response))}")
        return response
