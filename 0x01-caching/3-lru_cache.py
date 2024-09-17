#!/usr/bin/python3
""" Implement a LRU Cache """

BaseCaching = __import__('base_caching').BaseCaching


def used_now(lst, key):
    """To do linear shift when removing least used"""
    # Remove the first key
    index = lst.index(key)
    lst.pop(index)
    # Add the new key to the end of the list
    lst.append(key)


class LRUCache(BaseCaching):
    """LRU Cache system that inherits from BaseCaching"""

    def __init__(self):
        """ Initialize the class """
        super().__init__()
        self.least_list = []  # To track the last added/updated key
        self.least_key = None

    def put(self, key, item):
        """ Add an item to the cache with LRU eviction policy """
        if key is None or item is None:
            return

        # If the cache is full, evict the last added key
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            self.least_key = self.least_list[0]
            print('READY TO SPECIAL PUT {}'.format(key))
            print('{}' .format(self.least_list))
            if key not in self.cache_data:
                if self.least_key is not None:
                    del self.cache_data[self.least_key]
                    index = self.least_list.index(self.least_key)
                    self.least_list.pop(index)
                    self.least_list.append(key)
                    print(f"DISCARD: {self.least_key}")
            else:
                index = self.least_list.index(key)
                self.least_list.pop(index)
                self.least_list.append(key)
                print(f"DISCARD: {self.least_key}")
        else:
            self.least_list.append(key)

        # Add or update the cache with the key/item pair
        self.cache_data[key] = item
        print('AFTER ALL PUT')
        print('{}' .format(self.least_list))

    def get(self, key):
        """ Retrieve an item from the cache """
        if key is None:
            return None
        value = self.cache_data.get(key)
        if value is not None:
            used_now(self.least_list, key)
        print('AFTER GET of {}'.format(key))
        print('{}' .format(self.least_list))
        return value
