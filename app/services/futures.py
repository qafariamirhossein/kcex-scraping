"""Futures trading service for managing futures positions and orders."""

from typing import Dict, Any, Optional, List

from app.core.client import BaseClient
from app.utils.logger import logger, truncate_response


class FuturesService:
    """Service for futures trading API operations."""
    
    def __init__(self, client: BaseClient):
        """Initialize the futures service.
        
        Args:
            client: BaseClient instance for making API requests
        """
        self.client = client
        logger.info("FuturesService initialized")
    
    # ==================== Order History ====================
    
    def get_history_orders(
        self,
        symbol: str,
        start_time: int,
        end_time: int,
        category: int = 1,
        states: int = 3,
        page_num: int = 1,
        page_size: int = 400
    ) -> Dict[str, Any]:
        """Get history orders.
        
        Calls:
            GET /fapi/v1/private/order/list/history_orders
        
        Args:
            symbol: Trading symbol (e.g., "BTC_USDT")
            start_time: Start time in milliseconds
            end_time: End time in milliseconds
            category: Category (default: 1)
            states: Order states filter (default: 3)
            page_num: Page number (default: 1)
            page_size: Page size (default: 400)
        
        Returns:
            Dictionary containing history orders
        """
        logger.info(f"Getting history orders for {symbol}")
        
        params = {
            "symbol": symbol,
            "start_time": start_time,
            "end_time": end_time,
            "category": category,
            "states": states,
            "page_num": page_num,
            "page_size": page_size
        }
        
        response = self.client.get("/fapi/v1/private/order/list/history_orders", params=params)
        logger.debug(f"History orders response: {truncate_response(str(response))}")
        return response
    
    # ==================== Order Management ====================
    
    def place_order(
        self,
        symbol: str,
        side: str,
        position_side: str,
        order_type: str,
        quantity: float,
        price: Optional[float] = None,
        stop_price: Optional[float] = None,
        reduce_only: bool = False,
        close_position: bool = False,
        time_in_force: str = "GTC"
    ) -> Dict[str, Any]:
        """Place a futures order.
        
        Calls:
            POST /fapi/v1/private/order
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            side: Order side ("BUY" or "SELL")
            position_side: Position direction ("LONG", "SHORT", or "BOTH")
            order_type: Order type ("LIMIT", "MARKET", "STOP", "STOP_MARKET", "TAKE_PROFIT", "TAKE_PROFIT_MARKET")
            quantity: Order quantity
            price: Order price (required for LIMIT orders)
            stop_price: Stop price (required for STOP orders)
            reduce_only: Whether to reduce only position
            close_position: Whether to close entire position
            time_in_force: Time in force ("GTC", "IOC", "FOK")
        
        Returns:
            Dictionary containing order response
        """
        logger.info(f"Placing {side} {order_type} order for {symbol}")
        
        data = {
            "symbol": symbol,
            "side": side.upper(),
            "position_side": position_side.upper(),
            "type": order_type.upper(),
            "quantity": quantity,
            "reduce_only": reduce_only,
            "close_position": close_position,
            "time_in_force": time_in_force.upper()
        }
        
        if price is not None:
            data["price"] = str(price)
        
        if stop_price is not None:
            data["stop_price"] = str(stop_price)
        
        response = self.client.post("/fapi/v1/private/order", json=data)
        logger.debug(f"Place order response: {truncate_response(str(response))}")
        return response
    
    def cancel_order(self, symbol: str, order_id: Optional[int] = None, client_order_id: Optional[str] = None) -> Dict[str, Any]:
        """Cancel a futures order.
        
        Calls:
            POST /fapi/v1/private/order/cancel
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            order_id: Order ID to cancel
            client_order_id: Client order ID to cancel
        
        Returns:
            Dictionary containing cancellation response
        """
        logger.info(f"Cancelling order for {symbol}")
        
        data = {"symbol": symbol}
        
        if order_id is not None:
            data["order_id"] = order_id
        elif client_order_id is not None:
            data["client_order_id"] = client_order_id
        
        response = self.client.post("/fapi/v1/private/order/cancel", json=data)
        logger.debug(f"Cancel order response: {truncate_response(str(response))}")
        return response
    
    # ==================== Position Management ====================
    
    def set_leverage(
        self,
        symbol: str,
        leverage: int,
        position_side: str = "BOTH"
    ) -> Dict[str, Any]:
        """Set leverage for a symbol.
        
        Calls:
            POST /fapi/v1/private/leverage
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            leverage: Leverage level (e.g., 1, 5, 10, 20, 50, 75, 100)
            position_side: Position direction ("LONG", "SHORT", or "BOTH")
        
        Returns:
            Dictionary containing leverage setting response
        """
        logger.info(f"Setting leverage to {leverage}x for {symbol}")
        
        data = {
            "symbol": symbol,
            "leverage": leverage,
            "position_side": position_side.upper()
        }
        
        response = self.client.post("/fapi/v1/private/leverage", json=data)
        logger.debug(f"Set leverage response: {truncate_response(str(response))}")
        return response
    
    def set_margin_type(
        self,
        symbol: str,
        margin_type: str,
        position_side: Optional[str] = None
    ) -> Dict[str, Any]:
        """Set margin type for a symbol.
        
        Calls:
            POST /fapi/v1/private/marginType
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            margin_type: Margin type ("CROSS" or "ISOLATED")
            position_side: Position direction ("LONG", "SHORT", or "BOTH")
        
        Returns:
            Dictionary containing margin type setting response
        """
        logger.info(f"Setting margin type to {margin_type} for {symbol}")
        
        data = {
            "symbol": symbol,
            "margin_type": margin_type.upper()
        }
        
        if position_side is not None:
            data["position_side"] = position_side.upper()
        
        response = self.client.post("/fapi/v1/private/marginType", json=data)
        logger.debug(f"Set margin type response: {truncate_response(str(response))}")
        return response
    
    def add_margin(
        self,
        symbol: str,
        margin: float,
        position_side: str = "BOTH"
    ) -> Dict[str, Any]:
        """Add margin to a position.
        
        Calls:
            POST /fapi/v1/private/position/add_margin
        
        Args:
            symbol: Trading symbol
            margin: Amount of margin to add
            position_side: Position direction ("LONG", "SHORT", or "BOTH")
        
        Returns:
            Dictionary containing add margin response
        """
        logger.info(f"Adding {margin} margin to {symbol} {position_side}")
        
        data = {
            "symbol": symbol,
            "margin": str(margin),
            "position_side": position_side.upper()
        }
        
        response = self.client.post("/fapi/v1/private/position/add_margin", json=data)
        logger.debug(f"Add margin response: {truncate_response(str(response))}")
        return response
    
    def set_position_mode(
        self,
        hedge_mode: bool,
        position_side: Optional[str] = None
    ) -> Dict[str, Any]:
        """Set position mode (hedge mode or one-way mode).
        
        Calls:
            POST /fapi/v1/private/position_mode
        
        Args:
            hedge_mode: True for hedge mode, False for one-way mode
            position_side: Position direction (optional)
        
        Returns:
            Dictionary containing position mode setting response
        """
        logger.info(f"Setting position mode: {'HEDGE' if hedge_mode else 'ONE_WAY'}")
        
        data = {
            "hedge_mode": hedge_mode
        }
        
        if position_side is not None:
            data["position_side"] = position_side.upper()
        
        response = self.client.post("/fapi/v1/private/position_mode", json=data)
        logger.debug(f"Set position mode response: {truncate_response(str(response))}")
        return response
    
    # ==================== Account & Balance ====================
    
    def get_balance(self, asset: Optional[str] = None) -> Dict[str, Any]:
        """Get futures account balance.
        
        Calls:
            GET /fapi/v1/private/account/assets
        
        Args:
            asset: Asset symbol (e.g., "USDT") - optional
        
        Returns:
            Dictionary containing balance information
        """
        # Using account assets endpoint which works
        response = self.client.get("/fapi/v1/private/account/assets", params=params)
        logger.debug(f"Balance response: {truncate_response(str(response))}")
        return response
    
    def get_account_info(self) -> Dict[str, Any]:
        """Get futures account information.
        
        Calls:
            GET /fapi/v1/private/account/assets
        
        Returns:
            Dictionary containing account information
        """
        response = self.client.get("/fapi/v1/private/account/assets")
        logger.debug(f"Account info response: {truncate_response(str(response))}")
        return response
    
    # ==================== Market Data ====================
    
    def get_funding_rate(
        self,
        symbol: str
    ) -> Dict[str, Any]:
        """Get current funding rate.
        
        Calls:
            GET /fapi/v1/contract/funding_rate
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
        
        Returns:
            Dictionary containing funding rate information
        """
        response = self.client.get("/fapi/v1/contract/funding_rate", params=params)
        logger.debug(f"Funding rate response: {truncate_response(str(response))}")
        return response
    
    # ==================== Risk Management ====================
    
    def set_stop_loss(
        self,
        symbol: str,
        side: str,
        position_side: str,
        quantity: float,
        stop_price: float,
        reduce_only: bool = True
    ) -> Dict[str, Any]:
        """Set a stop loss order.
        
        Args:
            symbol: Trading symbol
            side: Order side ("BUY" or "SELL")
            position_side: Position direction
            quantity: Order quantity
            stop_price: Stop loss trigger price
            reduce_only: Whether to reduce only
        
        Returns:
            Dictionary containing stop loss order response
        """
        logger.info(f"Setting stop loss for {symbol} at {stop_price}")
        
        return self.place_order(
            symbol=symbol,
            side=side.upper(),
            position_side=position_side.upper(),
            order_type="STOP",
            quantity=quantity,
            stop_price=stop_price,
            reduce_only=reduce_only
        )
    
    def set_take_profit(
        self,
        symbol: str,
        side: str,
        position_side: str,
        quantity: float,
        stop_price: float,
        reduce_only: bool = True
    ) -> Dict[str, Any]:
        """Set a take profit order.
        
        Args:
            symbol: Trading symbol
            side: Order side ("BUY" or "SELL")
            position_side: Position direction
            quantity: Order quantity
            stop_price: Take profit trigger price
            reduce_only: Whether to reduce only
        
        Returns:
            Dictionary containing take profit order response
        """
        logger.info(f"Setting take profit for {symbol} at {stop_price}")
        
        return self.place_order(
            symbol=symbol,
            side=side.upper(),
            position_side=position_side.upper(),
            order_type="TAKE_PROFIT",
            quantity=quantity,
            stop_price=stop_price,
            reduce_only=reduce_only
        )
    
    def close_position(
        self,
        symbol: str,
        position_side: str = "BOTH"
    ) -> Dict[str, Any]:
        """Close entire position.
        
        Args:
            symbol: Trading symbol
            position_side: Position direction
        
        Returns:
            Dictionary containing close position response
        """
        logger.info(f"Closing position for {symbol}")
        
        # Get current position to determine side
        positions = self.get_positions(symbol=symbol)
        
        if isinstance(positions, dict) and "data" in positions:
            for pos in positions["data"]:
                if float(pos.get("position_amount", 0)) != 0:
                    side = "SELL" if float(pos.get("position_amount", 0)) > 0 else "BUY"
                    return self.place_order(
                        symbol=symbol,
                        side=side,
                        position_side=position_side.upper(),
                        order_type="MARKET",
                        quantity=abs(float(pos.get("position_amount", 0))),
                        close_position=True
                    )
        
        return {"code": -1, "msg": "No position to close"}
    
    # ==================== Advanced Order Types ====================
    
    def place_limit_order(
        self,
        symbol: str,
        side: str,
        position_side: str,
        quantity: float,
        price: float,
        reduce_only: bool = False,
        time_in_force: str = "GTC"
    ) -> Dict[str, Any]:
        """Place a limit order.
        
        Args:
            symbol: Trading symbol
            side: Order side ("BUY" or "SELL")
            position_side: Position direction
            quantity: Order quantity
            price: Limit price
            reduce_only: Whether to reduce only
            time_in_force: Time in force ("GTC", "IOC", "FOK")
        
        Returns:
            Dictionary containing order response
        """
        logger.info(f"Placing limit {side} order for {symbol} at {price}")
        
        return self.place_order(
            symbol=symbol,
            side=side,
            position_side=position_side,
            order_type="LIMIT",
            quantity=quantity,
            price=price,
            reduce_only=reduce_only,
            time_in_force=time_in_force
        )
    
    def place_market_order(
        self,
        symbol: str,
        side: str,
        position_side: str,
        quantity: float,
        reduce_only: bool = False
    ) -> Dict[str, Any]:
        """Place a market order.
        
        Args:
            symbol: Trading symbol
            side: Order side ("BUY" or "SELL")
            position_side: Position direction
            quantity: Order quantity
            reduce_only: Whether to reduce only
        
        Returns:
            Dictionary containing order response
        """
        logger.info(f"Placing market {side} order for {symbol}")
        
        return self.place_order(
            symbol=symbol,
            side=side,
            position_side=position_side,
            order_type="MARKET",
            quantity=quantity,
            reduce_only=reduce_only
        )
    
    def place_stop_limit_order(
        self,
        symbol: str,
        side: str,
        position_side: str,
        quantity: float,
        price: float,
        stop_price: float,
        reduce_only: bool = False,
        time_in_force: str = "GTC"
    ) -> Dict[str, Any]:
        """Place a stop-limit order.
        
        Args:
            symbol: Trading symbol
            side: Order side ("BUY" or "SELL")
            position_side: Position direction
            quantity: Order quantity
            price: Limit price
            stop_price: Stop trigger price
            reduce_only: Whether to reduce only
            time_in_force: Time in force ("GTC", "IOC", "FOK")
        
        Returns:
            Dictionary containing order response
        """
        logger.info(f"Placing stop-limit {side} order for {symbol} at {stop_price} -> {price}")
        
        return self.place_order(
            symbol=symbol,
            side=side,
            position_side=position_side,
            order_type="STOP",
            quantity=quantity,
            price=price,
            stop_price=stop_price,
            reduce_only=reduce_only,
            time_in_force=time_in_force
        )
    
    def place_stop_market_order(
        self,
        symbol: str,
        side: str,
        position_side: str,
        quantity: float,
        stop_price: float,
        reduce_only: bool = False
    ) -> Dict[str, Any]:
        """Place a stop-market order.
        
        Args:
            symbol: Trading symbol
            side: Order side ("BUY" or "SELL")
            position_side: Position direction
            quantity: Order quantity
            stop_price: Stop trigger price
            reduce_only: Whether to reduce only
        
        Returns:
            Dictionary containing order response
        """
        logger.info(f"Placing stop-market {side} order for {symbol} at {stop_price}")
        
        return self.place_order(
            symbol=symbol,
            side=side,
            position_side=position_side,
            order_type="STOP_MARKET",
            quantity=quantity,
            stop_price=stop_price,
            reduce_only=reduce_only
        )
    
    def place_take_profit_market_order(
        self,
        symbol: str,
        side: str,
        position_side: str,
        quantity: float,
        stop_price: float,
        reduce_only: bool = True
    ) -> Dict[str, Any]:
        """Place a take-profit-market order.
        
        Args:
            symbol: Trading symbol
            side: Order side ("BUY" or "SELL")
            position_side: Position direction
            quantity: Order quantity
            stop_price: Take profit trigger price
            reduce_only: Whether to reduce only
        
        Returns:
            Dictionary containing order response
        """
        logger.info(f"Placing take-profit-market {side} order for {symbol} at {stop_price}")
        
        return self.place_order(
            symbol=symbol,
            side=side,
            position_side=position_side,
            order_type="TAKE_PROFIT_MARKET",
            quantity=quantity,
            stop_price=stop_price,
            reduce_only=reduce_only
        )
    

