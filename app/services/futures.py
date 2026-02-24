"""Futures trading service for managing futures positions and orders."""

from typing import Dict, Any, Optional, List

from app.core.client import BaseClient
from app.utils.logger import logger


class FuturesService:
    """Service for futures trading API operations."""
    
    def __init__(self, client: BaseClient):
        """Initialize the futures service.
        
        Args:
            client: BaseClient instance for making API requests
        """
        self.client = client
        logger.info("FuturesService initialized")
    
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
        logger.debug(f"Place order response: {response}")
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
        logger.debug(f"Cancel order response: {response}")
        return response
    
    def get_open_orders(
        self,
        symbol: Optional[str] = None,
        order_id: Optional[int] = None,
        start_time: Optional[int] = None,
        limit: int = 100
    ) -> Dict[str, Any]:
        """Get open orders.
        
        Calls:
            GET /fapi/v1/private/order/list
        
        Args:
            symbol: Trading symbol (optional)
            order_id: Order ID to start from
            start_time: Start time in milliseconds
            limit: Maximum number of orders to return
        
        Returns:
            Dictionary containing open orders
        """
        logger.info(f"Fetching open orders for {symbol or 'all symbols'}")
        
        params = {"limit": limit}
        
        if symbol is not None:
            params["symbol"] = symbol
        if order_id is not None:
            params["order_id"] = order_id
        if start_time is not None:
            params["start_time"] = start_time
        
        # Try different endpoint paths
        try:
            response = self.client.get("/fapi/v1/private/order/list", params=params)
        except Exception as e:
            logger.debug(f"First attempt failed, trying alternative endpoint: {e}")
            response = self.client.get("/fapi/v1/private/order/list/open", params=params)
        
        logger.debug(f"Open orders response: {response}")
        return response
    
    def get_order_history(
        self,
        symbol: Optional[str] = None,
        order_id: Optional[int] = None,
        start_time: Optional[int] = None,
        end_time: Optional[int] = None,
        limit: int = 100
    ) -> Dict[str, Any]:
        """Get order history.
        
        Calls:
            GET /fapi/v1/private/order/list/history
        
        Args:
            symbol: Trading symbol (optional)
            order_id: Order ID to start from
            start_time: Start time in milliseconds
            end_time: End time in milliseconds
            limit: Maximum number of orders to return
        
        Returns:
            Dictionary containing order history
        """
        logger.info(f"Fetching order history for {symbol or 'all symbols'}")
        
        params = {"limit": limit}
        
        if symbol is not None:
            params["symbol"] = symbol
        if order_id is not None:
            params["order_id"] = order_id
        if start_time is not None:
            params["start_time"] = start_time
        if end_time is not None:
            params["end_time"] = end_time
        
        response = self.client.get("/fapi/v1/private/order/list/history", params=params)
        logger.debug(f"Order history response: {response}")
        return response
    
    def get_order_details(
        self,
        symbol: str,
        order_id: Optional[int] = None,
        client_order_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get order details.
        
        Calls:
            GET /fapi/v1/private/order
        
        Args:
            symbol: Trading symbol
            order_id: Order ID
            client_order_id: Client order ID
        
        Returns:
            Dictionary containing order details
        """
        logger.info(f"Fetching order details for {symbol}")
        
        params = {"symbol": symbol}
        
        if order_id is not None:
            params["order_id"] = order_id
        elif client_order_id is not None:
            params["client_order_id"] = client_order_id
        
        response = self.client.get("/fapi/v1/private/order", params=params)
        logger.debug(f"Order details response: {response}")
        return response
    
    # ==================== Position Management ====================
    
    def get_positions(
        self,
        symbol: Optional[str] = None,
        position_id: Optional[int] = None
    ) -> Dict[str, Any]:
        """Get positions.
        
        Calls:
            GET /fapi/v1/private/position/list
        
        Args:
            symbol: Trading symbol (optional)
            position_id: Position ID (optional)
        
        Returns:
            Dictionary containing positions
        """
        logger.info(f"Fetching positions for {symbol or 'all symbols'}")
        
        params = {}
        
        if symbol is not None:
            params["symbol"] = symbol
        if position_id is not None:
            params["position_id"] = position_id
        
        # Try different endpoint paths
        try:
            response = self.client.get("/fapi/v1/private/position/list", params=params)
        except Exception as e:
            logger.debug(f"First attempt failed, trying alternative: {e}")
            try:
                response = self.client.get("/fapi/v1/private/position", params=params)
            except:
                response = self.client.get("/fapi/v1/private/position/all", params=params)
        
        logger.debug(f"Positions response: {response}")
        return response
    
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
        logger.debug(f"Set leverage response: {response}")
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
        logger.debug(f"Set margin type response: {response}")
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
        logger.debug(f"Add margin response: {response}")
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
        logger.debug(f"Set position mode response: {response}")
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
        logger.info(f"Fetching futures balance for {asset or 'all assets'}")
        
        params = {}
        if asset is not None:
            params["asset"] = asset
        
        # Using account assets endpoint which works
        response = self.client.get("/fapi/v1/private/account/assets", params=params)
        logger.debug(f"Balance response: {response}")
        return response
    
    def get_account_info(self) -> Dict[str, Any]:
        """Get futures account information.
        
        Calls:
            GET /fapi/v1/private/account/info
        
        Returns:
            Dictionary containing account information
        """
        logger.info("Fetching futures account info")
        
        response = self.client.get("/fapi/v1/private/account/info")
        logger.debug(f"Account info response: {response}")
        return response
    
    # ==================== Market Data ====================
    
    def get_klines(
        self,
        symbol: str,
        interval: str,
        start_time: Optional[int] = None,
        end_time: Optional[int] = None,
        limit: int = 500
    ) -> Dict[str, Any]:
        """Get kline/candlestick data.
        
        Calls:
            GET /fapi/v1/public/market/klines
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            interval: Kline interval (1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M)
            start_time: Start time in milliseconds
            end_time: End time in milliseconds
            limit: Maximum number of klines to return
        
        Returns:
            Dictionary containing kline data
        """
        logger.info(f"Fetching klines for {symbol} {interval}")
        
        params = {
            "symbol": symbol,
            "interval": interval,
            "limit": limit
        }
        
        if start_time is not None:
            params["start_time"] = start_time
        if end_time is not None:
            params["end_time"] = end_time
        
        response = self.client.get("/fapi/v1/public/market/klines", params=params)
        logger.debug(f"Klines response: {response}")
        return response
    
    def get_depth(
        self,
        symbol: str,
        limit: int = 100
    ) -> Dict[str, Any]:
        """Get market depth (order book).
        
        Calls:
            GET /fapi/v1/public/market/depth
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            limit: Number of orders to return (5, 10, 20, 50, 100)
        
        Returns:
            Dictionary containing order book depth
        """
        logger.info(f"Fetching depth for {symbol}")
        
        params = {
            "symbol": symbol,
            "limit": limit
        }
        
        response = self.client.get("/fapi/v1/public/market/depth", params=params)
        logger.debug(f"Depth response: {response}")
        return response
    
    def get_ticker(
        self,
        symbol: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get 24hr ticker price change statistics.
        
        Calls:
            GET /fapi/v1/public/market/ticker
        
        Args:
            symbol: Trading symbol (optional - if not provided, returns all tickers)
        
        Returns:
            Dictionary containing ticker information
        """
        logger.info(f"Fetching ticker for {symbol or 'all symbols'}")
        
        params = {}
        if symbol is not None:
            params["symbol"] = symbol
        
        response = self.client.get("/fapi/v1/public/market/ticker", params=params)
        logger.debug(f"Ticker response: {response}")
        return response
    
    def get_trades(
        self,
        symbol: str,
        limit: int = 100
    ) -> Dict[str, Any]:
        """Get recent trades.
        
        Calls:
            GET /fapi/v1/public/market/trades
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            limit: Number of trades to return
        
        Returns:
            Dictionary containing recent trades
        """
        logger.info(f"Fetching recent trades for {symbol}")
        
        params = {
            "symbol": symbol,
            "limit": limit
        }
        
        response = self.client.get("/fapi/v1/public/market/trades", params=params)
        logger.debug(f"Trades response: {response}")
        return response
    
    def get_exchange_info(self) -> Dict[str, Any]:
        """Get exchange information (symbols, limits, etc.).
        
        Calls:
            GET /fapi/v1/public/market/exchange_info
        
        Returns:
            Dictionary containing exchange information
        """
        logger.info("Fetching exchange info")
        
        response = self.client.get("/fapi/v1/public/market/exchange_info")
        logger.debug(f"Exchange info response: {response}")
        return response
    
    def get_funding_rate(
        self,
        symbol: str
    ) -> Dict[str, Any]:
        """Get current funding rate.
        
        Calls:
            GET /fapi/v1/public/market/funding_rate
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
        
        Returns:
            Dictionary containing funding rate information
        """
        logger.info(f"Fetching funding rate for {symbol}")
        
        params = {"symbol": symbol}
        
        response = self.client.get("/fapi/v1/public/market/funding_rate", params=params)
        logger.debug(f"Funding rate response: {response}")
        return response
    
    def get_open_interest(
        self,
        symbol: str
    ) -> Dict[str, Any]:
        """Get open interest.
        
        Calls:
            GET /fapi/v1/public/market/open_interest
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
        
        Returns:
            Dictionary containing open interest information
        """
        logger.info(f"Fetching open interest for {symbol}")
        
        params = {"symbol": symbol}
        
        response = self.client.get("/fapi/v1/public/market/open_interest", params=params)
        logger.debug(f"Open interest response: {response}")
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
