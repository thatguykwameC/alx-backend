#!/usr/bin/env python3
""" Simple helper function """


def index_range(page: int, page_size: int) -> tuple:
    """
    Calcs start and end index for pagination

    Args:
        page: current page
        page_size: number of items per page

    Returns:
        tuple of start and end index
    """
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    return (start_idx, end_idx)
