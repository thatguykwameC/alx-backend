#!/usr/bin/env python3
"""This module implements a basic caching module."""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Implements a basic caching system."""

    def put(self, key, item):
        """
            Assign the item value to the dict for key key
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
            Returns the value in self.cache_data linked to key
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
