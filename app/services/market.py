"""Market data service for retrieving market information."""

from typing import Dict, Any, Optional, List

from app.core.client import BaseClient
from app.utils.logger import logger, truncate_response


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
        response = self.client.get("/fapi/v1/contract/ticker", params=params)
        logger.debug(f"Contract ticker response: {truncate_response(str(response))}")
        return response
    
    # ==================== Market Data ====================
    
    def get_all_tickers(self) -> Dict[str, Any]:
        """Get all contract tickers.
        
        Calls:
            GET /fapi/v1/contract/ticker/all
        
        Returns:
            Dictionary containing all contract tickers
        """
        response = self.client.get("/fapi/v1/contract/ticker/all")
        logger.debug(f"All tickers response: {truncate_response(str(response))}")
        return response
    
    def get_contract_list(self) -> Dict[str, Any]:
        """Get all available contracts.
        
        Calls:
            GET /fapi/v1/contract/all
        
        Returns:
            Dictionary containing all available contracts
        """
        response = self.client.get("/fapi/v1/contract/all")
        logger.debug(f"Contract list response: {truncate_response(str(response))}")
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
        response = self.client.get("/fapi/v1/contract/leverage_tiers", params=params)
        logger.debug(f"Leverage tiers response: {truncate_response(str(response))}")
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
        response = self.client.get("/fapi/v1/contract/snapshot", params=params)
        logger.debug(f"Market snapshot response: {truncate_response(str(response))}")
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
        response = self.client.get("/fapi/v1/contract/top_long_short_position", params=params)
        logger.debug(f"Top positions response: {truncate_response(str(response))}")
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
        response = self.client.get("/fapi/v1/contract/top_long_short_ratio", params=params)
        logger.debug(f"Top ratio response: {truncate_response(str(response))}")
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
        response = self.client.get("/fapi/v1/contract/global_long_short_ratio", params=params)
        logger.debug(f"Global ratio response: {truncate_response(str(response))}")
        return response
