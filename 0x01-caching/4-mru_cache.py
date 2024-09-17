#!/usr/bin/python3
""" Implement a MRU Cache """

BaseCaching = __import__('base_caching').BaseCaching


def used_now(lst, key):
    """To do linear shift when removing least used"""
    # Remove the first key
    index = lst.index(key)
    lst.pop(index)
    # Add the new key to the end of the list
    lst.append(key)


class MRUCache(BaseCaching):
    """MRU Cache system that inherits from BaseCaching"""

    def __init__(self):
        """ Initialize the class """
        super().__init__()
        self.most_list = []  # To track the last added/updated key
        self.most_key = None

    def put(self, key, item):
        """ Add an item to the cache with MRU eviction policy """
        if key is None or item is None:
            return

        # If the cache is full, evict the last added key
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            most_used_index = BaseCaching.MAX_ITEMS - 1
            self.most_key = self.most_list[most_used_index]
            if key not in self.cache_data:
                if self.most_key is not None:
                    del self.cache_data[self.most_key]
                    index = self.most_list.index(self.most_key)
                    self.most_list.pop(index)
                    self.most_list.append(key)
                    print(f"DISCARD: {self.most_key}")
            else:
                index = self.most_list.index(key)
                self.most_list.pop(index)
                self.most_list.append(key)
                print(f"DISCARD: {self.most_key}")
        else:
            self.most_list.append(key)

        # Add or update the cache with the key/item pair
        self.cache_data[key] = item

    def get(self, key):
        """ Retrieve an item from the cache """
        if key is None:
            return None
        value = self.cache_data.get(key)
        if value is not None:
            used_now(self.most_list, key)
        return value
