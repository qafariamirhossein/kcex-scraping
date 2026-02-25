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
    
    # ==================== Create Order ====================
    
    def create_order(
        self,
        symbol: str,
        side: int,
        open_type: int = 1,
        order_type: str = "1",
        volume: int = 1,
        leverage: int = 20,
        price: Optional[str] = None,
        market_ceiling: bool = False,
        price_protect: str = "0",
        bbo_price_type: str = "1",
        content_sign: Optional[str] = None,
        content_time: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create a futures order.
        
        Calls:
            POST /fapi/v1/private/order/create
        
        Args:
            symbol: Trading symbol (e.g., "TRUMP_USDT", "BTC_USDT")
            side: Order side (1 = BUY, 3 = SELL)
            open_type: Open type (1 = open position)
            order_type: Order type ("1" = Limit, "2" = Market, etc.)
            volume: Order volume/quantity
            leverage: Leverage level (e.g., 20)
            price: Order price (required for limit orders)
            market_ceiling: Whether to use market ceiling
            price_protect: Price protection flag ("0" = disabled, "1" = enabled)
            bbo_price_type: BBO price type ("1" = best bid/offer, "2" = last price)
            content_sign: Optional content signature header
            content_time: Optional content timestamp header (milliseconds)
        
        Returns:
            Dictionary containing order creation response
        """
        logger.info(f"Creating order for {symbol}: side={side}, type={order_type}, vol={volume}, leverage={leverage}")
        
        data = {
            "symbol": symbol,
            "side": side,
            "openType": open_type, # 1 = open position
            "type": order_type, # To buy = 1
            "vol": volume,
            "leverage": leverage,
            "marketCeiling": market_ceiling, # False
            "priceProtect": price_protect, # "0"
            "bboPriceType": bbo_price_type # "1"
        }
        
        if price is not None:
            data["price"] = price
        
        # Build additional headers if provided
        extra_headers = None
        if content_sign or content_time:
            extra_headers = {}
            if content_sign:
                extra_headers["content-sign"] = content_sign
            if content_time:
                extra_headers["content-time"] = content_time
        
        response = self.client.post("/fapi/v1/private/order/create", json=data, headers=extra_headers)
        logger.debug(f"Create order response: {truncate_response(str(response))}")
        return response
    
    # ==================== Close Position ====================
    
    def close_position(
        self,
        symbol: str,
        position_id: int,
        side: int,
        open_type: int = 1,
        order_type: str = "1",
        volume: int = 1,
        leverage: int = 20,
        price: Optional[str] = None,
        flash_close: bool = False,
        price_protect: str = "0",
        content_sign: Optional[str] = None,
        content_time: Optional[str] = None
    ) -> Dict[str, Any]:
        """Close an existing futures position.
        
        Calls:
            POST /fapi/v1/private/order/create
        
        Args:
            symbol: Trading symbol (e.g., "TRUMP_USDT", "BTC_USDT")
            position_id: The position ID to close
            side: Order side (1 = BUY to close SELL, 3 = SELL to close BUY)
            open_type: Open type (1 = open position, 2 = close position)
            order_type: Order type ("1" = Limit, "2" = Market, etc.)
            volume: Order volume/quantity
            leverage: Leverage level (e.g., 20)
            price: Order price (required for limit orders)
            flash_close: Flash close flag
            price_protect: Price protection flag ("0" = disabled, "1" = enabled)
            content_sign: Optional content signature header
            content_time: Optional content timestamp header (milliseconds)
        
        Returns:
            Dictionary containing order creation response
        """
        logger.info(f"Closing position {position_id} for {symbol}: side={side}, type={order_type}, vol={volume}")
        
        data = {
            "symbol": symbol,
            "positionId": position_id,
            "side": side,
            "openType": open_type,
            "type": order_type,
            "vol": volume,
            "leverage": leverage,
            "flashClose": flash_close,
            "priceProtect": price_protect
        }
        
        if price is not None:
            data["price"] = price
        
        # Build additional headers if provided
        extra_headers = None
        if content_sign or content_time:
            extra_headers = {}
            if content_sign:
                extra_headers["content-sign"] = content_sign
            if content_time:
                extra_headers["content-time"] = content_time
        
        response = self.client.post("/fapi/v1/private/order/create", json=data, headers=extra_headers)
        logger.debug(f"Close position response: {truncate_response(str(response))}")
        return response
    
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
        params = {}
        if symbol:
            params["symbol"] = symbol
        if start_time is not None:
            params["start_time"] = start_time
        if end_time is not None:
            params["end_time"] = end_time
        
        response = self.client.get("/fapi/v1/private/order/list/order_deals", params=params)
        logger.debug(f"Order history response: {truncate_response(str(response))}")
        return response
