import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  categories: ['All', 'Japanese', 'Korean', 'Ayurvedic'],
  selectedCategory: 'All',
  filters: {
    category: 'All',
    priceRange: [0, 10000],
    searchTerm: '',
    rating: 0,
    sortBy: '', // 'priceLowHigh', 'priceHighLow', 'ratingHighLow'
    inStockOnly: false,
    tags: [],
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set all products and initialize filteredProducts
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: uuidv4() };
      state.products.push(newProduct);
      state.filteredProducts = state.products;
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        p => p.products_serial_id === action.payload.products_serial_id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        state.filteredProducts = state.products;
      }
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        p => p.products_serial_id !== action.payload
      );
      state.filteredProducts = state.products;
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    setFilters: (state, action) => {
      const {
        category,
        priceRange,
        searchTerm,
        rating,
        sortBy,
        inStockOnly,
        tags,
      } = action.payload;

      // Update filters in state
      state.filters = {
        ...state.filters,
        ...(category !== undefined && { category }),
        ...(priceRange !== undefined && { priceRange }),
        ...(searchTerm !== undefined && { searchTerm }),
        ...(rating !== undefined && { rating }),
        ...(sortBy !== undefined && { sortBy }),
        ...(inStockOnly !== undefined && { inStockOnly }),
        ...(tags !== undefined && { tags }),
      };

      const {
        products,
        filters: {
          category: cat,
          priceRange: [minPrice, maxPrice],
          searchTerm: keyword,
          rating: minRating,
          tags: activeTags,
        },
      } = state;

      const filtered = products.filter((product) => {
        const matchPrice = product.price >= minPrice && product.price <= maxPrice;

        const matchKeyword =
          keyword === '' ||
          product.product_name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase());

        // Combine product_type and skin_type to match against active tags
        const productTags = [
          ...(Array.isArray(product.product_type)
            ? product.product_type
            : product.product_type
              ? [product.product_type]
              : []),
          ...(Array.isArray(product.skin_type)
            ? product.skin_type
            : product.skin_type
              ? [product.skin_type]
              : []),
        ];
        const matchTags =
          activeTags.length === 0 ||
          activeTags.every((tag) => productTags.includes(tag));

        return matchPrice && matchKeyword && matchTags;
      });

      state.filteredProducts = filtered;
    },

    // Helper reducers (optional forwarding)
    filterByProductType: (state, action) => {
      const selectedProductTypes = action.payload; // array of selected types
      const updatedTags = [
        ...selectedProductTypes,
        ...state.filters.tags.filter(tag => !['Japanese', 'Korean', 'Ayurvedic', 'Natural'].includes(tag)),
      ];

      const updatedFilters = { ...state.filters, tags: updatedTags };

      productSlice.caseReducers.setFilters(state, {
        payload: updatedFilters,
        type: 'products/setFilters',
      });
    },
    filterBySkinType: (state, action) => {
      const selectedSkinTypes = action.payload; // array of selected skin types
      const updatedTags = [
        ...state.filters.tags.filter(tag => !['Oily', 'Dry', 'Sensitive', 'Combination', 'Normal'].includes(tag)),
        ...selectedSkinTypes,
      ];

      const updatedFilters = { ...state.filters, tags: updatedTags };

      productSlice.caseReducers.setFilters(state, {
        payload: updatedFilters,
        type: 'products/setFilters',
      });
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload;

      // Update only the search term in filters
      state.filters.searchTerm = searchTerm;

      // Extract all current filters
      const {
        priceRange: [minPrice, maxPrice],
        tags,
      } = state.filters;

      const filtered = state.products.filter(product => {
        const matchPrice = product.price >= minPrice && product.price <= maxPrice;

        const matchKeyword =
          searchTerm === '' ||
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());

        const productTags = [
          ...(Array.isArray(product.product_type)
            ? product.product_type
            : product.product_type
              ? [product.product_type]
              : []),
          ...(Array.isArray(product.skin_type)
            ? product.skin_type
            : product.skin_type
              ? [product.skin_type]
              : []),
        ];

        const matchTags =
          tags.length === 0 ||
          tags.every(tag => productTags.includes(tag));

        return matchPrice && matchKeyword && matchTags;
      });

      state.filteredProducts = filtered;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setSelectedProduct,
  setFilters,
  filterByCategory,
  searchProducts,
  filterBySkinType,
  filterByProductType,
  setLoading,
} = productSlice.actions;

export default productSlice.reducer;
