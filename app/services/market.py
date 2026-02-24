"""Market data service for retrieving market information."""

from typing import Dict, Any, Optional, List

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
    
    # ==================== Market Data ====================
    
    def get_all_tickers(self) -> Dict[str, Any]:
        """Get all contract tickers.
        
        Calls:
            GET /fapi/v1/contract/ticker/all
        
        Returns:
            Dictionary containing all contract tickers
        """
        logger.info("Fetching all contract tickers")
        
        response = self.client.get("/fapi/v1/contract/ticker/all")
        logger.debug(f"All tickers response: {response}")
        return response
    
    def get_contract_list(self) -> Dict[str, Any]:
        """Get all available contracts.
        
        Calls:
            GET /fapi/v1/contract/all
        
        Returns:
            Dictionary containing all available contracts
        """
        logger.info("Fetching contract list")
        
        response = self.client.get("/fapi/v1/contract/all")
        logger.debug(f"Contract list response: {response}")
        return response
    
    def get_leverage_tiers(self, symbol: Optional[str] = None) -> Dict[str, Any]:
        """Get leverage tiers for a symbol.
        
        Calls:
            GET /fapi/v1/contract/leverage_tiers
        
        Args:
            symbol: Trading symbol (optional - if not provided, returns all)
        
        Returns:
            Dictionary containing leverage tier information
        """
        logger.info(f"Fetching leverage tiers for {symbol or 'all symbols'}")
        
        params = {}
        if symbol is not None:
            params["symbol"] = symbol
        
        response = self.client.get("/fapi/v1/contract/leverage_tiers", params=params)
        logger.debug(f"Leverage tiers response: {response}")
        return response
    
    def get_market_snapshot(
        self,
        symbol: str,
        interval: str,
        start_time: Optional[int] = None,
        end_time: Optional[int] = None
    ) -> Dict[str, Any]:
        """Get market snapshot (OHLCV) data.
        
        Calls:
            GET /fapi/v1/contract/snapshot
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            interval: Kline interval (1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M)
            start_time: Start time in milliseconds
            end_time: End time in milliseconds
        
        Returns:
            Dictionary containing market snapshot data
        """
        logger.info(f"Fetching market snapshot for {symbol}")
        
        params = {"symbol": symbol, "interval": interval}
        
        if start_time is not None:
            params["start_time"] = start_time
        if end_time is not None:
            params["end_time"] = end_time
        
        response = self.client.get("/fapi/v1/contract/snapshot", params=params)
        logger.debug(f"Market snapshot response: {response}")
        return response
    
    def get_top_long_short_position(
        self,
        symbol: str,
        period: str = "1h"
    ) -> Dict[str, Any]:
        """Get top trader positions (long/short).
        
        Calls:
            GET /fapi/v1/contract/top_long_short_position
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            period: Time period (5m, 15m, 1h, 4h, 1d)
        
        Returns:
            Dictionary containing top trader positions
        """
        logger.info(f"Fetching top long/short positions for {symbol}")
        
        params = {"symbol": symbol, "period": period}
        
        response = self.client.get("/fapi/v1/contract/top_long_short_position", params=params)
        logger.debug(f"Top positions response: {response}")
        return response
    
    def get_top_long_short_ratio(
        self,
        symbol: str,
        period: str = "1h"
    ) -> Dict[str, Any]:
        """Get top trader long/short ratio.
        
        Calls:
            GET /fapi/v1/contract/top_long_short_ratio
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            period: Time period (5m, 15m, 1h, 4h, 1d)
        
        Returns:
            Dictionary containing top trader ratio
        """
        logger.info(f"Fetching top long/short ratio for {symbol}")
        
        params = {"symbol": symbol, "period": period}
        
        response = self.client.get("/fapi/v1/contract/top_long_short_ratio", params=params)
        logger.debug(f"Top ratio response: {response}")
        return response
    
    def get_global_long_short_ratio(
        self,
        symbol: str,
        period: str = "1h"
    ) -> Dict[str, Any]:
        """Get global long/short ratio.
        
        Calls:
            GET /fapi/v1/contract/global_long_short_ratio
        
        Args:
            symbol: Trading symbol (e.g., "BTCUSDT")
            period: Time period (5m, 15m, 1h, 4h, 1d)
        
        Returns:
            Dictionary containing global long/short ratio
        """
        logger.info(f"Fetching global long/short ratio for {symbol}")
        
        params = {"symbol": symbol, "period": period}
        
        response = self.client.get("/fapi/v1/contract/global_long_short_ratio", params=params)
        logger.debug(f"Global ratio response: {response}")
        return response
