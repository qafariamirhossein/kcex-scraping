"""Logging utilities for the crypto trading bot."""

import logging
import sys
from pathlib import Path


def truncate_response(message: str, prefix_len: int = 200, suffix_len: int = 100) -> str:
    """Truncate a long message to show prefix and suffix.
    
    Args:
        message: The message to truncate
        prefix_len: Length of the prefix to show (default: 200)
        suffix_len: Length of the suffix to show (default: 100)
    
    Returns:
        Truncated message if longer than prefix + suffix + "...", otherwise original message
    """
    if len(message) <= prefix_len + suffix_len + 5:  # 5 for "..."
        return message
    return f"{message[:prefix_len]}...{message[-suffix_len:]}"


def setup_logger(name: str = "kcex-bot", level: int = logging.INFO) -> logging.Logger:
    """Configure and return a logger instance.
    
    Args:
        name: Logger name
        level: Logging level (default: INFO)
    
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    
    return logger


# Default logger instance
logger = setup_logger()
