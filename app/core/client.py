"""Base HTTP client for API requests."""

import httpx
from typing import Any, Dict, Optional

from app.core.auth import generate_headers
from app.utils.logger import logger


class APIError(Exception):
    """Custom exception for API errors."""
    
    def __init__(self, message: str, status_code: Optional[int] = None):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class BaseClient:
    """Base HTTP client for making API requests."""
    
    def __init__(self, base_url: str, timeout: int = 30):
        """Initialize the base client.
        
        Args:
            base_url: Base URL for the API
            timeout: Request timeout in seconds
        """
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.client = httpx.Client(timeout=timeout)
        logger.info(f"BaseClient initialized with base_url: {base_url}")
    
    def _build_url(self, path: str) -> str:
        """Build the full URL from path.
        
        Args:
            path: API endpoint path
        
        Returns:
            Full URL
        """
        return f"{self.base_url}{path}"
    
    def _request(self, method: str, path: str, **kwargs) -> Dict[str, Any]:
        """Make an HTTP request with authentication.
        
        Args:
            method: HTTP method (GET, POST, etc.)
            path: API endpoint path
            **kwargs: Additional arguments to pass to the request
        
        Returns:
            Response data as dictionary
        
        Raises:
            APIError: If the response is not successful
        """
        url = self._build_url(path)
        
        # Get request body if provided
        body = kwargs.get("json") or kwargs.get("data")
        
        # Generate authentication headers
        headers = generate_headers(method, path, body)
        
        # Merge with any additional headers
        if "headers" in kwargs:
            headers.update(kwargs.pop("headers"))
        
        logger.debug(f"Making {method} request to {url}")
        
        try:
            response = self.client.request(
                method=method,
                url=url,
                headers=headers,
                **kwargs
            )
            
            if response.status_code >= 400:
                logger.error(f"API request failed: {response.status_code} - {response.text}")
                raise APIError(
                    message=f"API request failed: {response.text}",
                    status_code=response.status_code
                )
            
            logger.debug(f"Response status: {response.status_code}")
            return response.json()
            
        except httpx.RequestError as e:
            logger.error(f"Request error: {e}")
            raise APIError(f"Request error: {e}")
    
    def get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Make a GET request.
        
        Args:
            path: API endpoint path
            params: Query parameters
        
        Returns:
            Response data as dictionary
        """
        return self._request("GET", path, params=params)
    
    def post(self, path: str, json: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Make a POST request.
        
        Args:
            path: API endpoint path
            json: JSON body for the request
        
        Returns:
            Response data as dictionary
        """
        return self._request("POST", path, json=json)
    
    def close(self):
        """Close the HTTP client."""
        self.client.close()
    
    def __enter__(self):
        """Context manager entry."""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit."""
        self.close()
