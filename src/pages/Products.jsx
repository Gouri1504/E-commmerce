import React, { useState, useEffect, lazy, Suspense, useRef, useMemo } from 'react';
import axios from 'axios';
import {
    Search,
    X,
    Camera,
    Loader2,
    Star,
    ShoppingCart
} from 'lucide-react';

// Assuming you have these components/contexts
import Sidebar from '../components/Sidebar';
import { useCart } from '../context/CartContext';
import Scanner from '../components/Scanner'; // Placeholder!

const ProductImage = lazy(() => import('../components/ProductImage'));

// Debounce function (you can use lodash.debounce if you prefer)
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isScanning, setIsScanning] = useState(false);
    const [scannedCode, setScannedCode] = useState('');
    const [scannerError, setScannerError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const scannerRef = useRef(null);
    const { dispatch } = useCart();

    // Debounced search query state
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    useEffect(() => {
        setDebouncedSearchQuery(searchQuery);
    }, [searchQuery]);


    // Fetch products from Fake Store API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(`Failed to fetch products: ${err.message}`); // More specific error
                setLoading(false);
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);


    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseProductDetails = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
            },
        });
        handleCloseProductDetails();
    };


    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return (
                product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) &&
                product.price >= priceRange[0] && product.price <= priceRange[1] &&
                (selectedCategory === 'All' || product.category === selectedCategory) &&
                (!scannedCode || product.id.toString() === scannedCode)
            );
        });
    }, [products, debouncedSearchQuery, priceRange, selectedCategory, scannedCode]);  // Dependencies for useMemo

    // Unique categories extraction
    const categories = useMemo(() => {
        return ['All', ...new Set(products.map(product => product.category))];
    }, [products]);

    // Render the product details modal
    const renderProductDetailsModal = () => {
        if (!selectedProduct) return null;

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30 p-4 overflow-y-auto"
                onClick={handleCloseProductDetails}
            >
                <div
                    className="bg-white rounded-xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row transform transition-all duration-300 scale-100 border border-gray-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleCloseProductDetails}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 bg-white/50 rounded-full p-2 backdrop-blur-sm"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Product Image */}
                    <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className="max-h-96 object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {selectedProduct.title}
                            </h2>

                            {/* Category */}
                            <div className="mb-4">
                                <span className="bg-blue-100 text-[#001C55]  text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                    {selectedProduct.category}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="text-4xl font-extrabold text-[#001C55] mb-6">
                                ${selectedProduct.price.toFixed(2)}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {selectedProduct.description}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center mr-4">
                                    {[...Array(Math.round(selectedProduct.rating.rate))].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                                    ))}
                                    {[...Array(5 - Math.round(selectedProduct.rating.rate))].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-gray-300" />
                                    ))}
                                </div>
                                <span className="text-gray-600">
                                    ({selectedProduct.rating.count} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => handleAddToCart(selectedProduct)}
                            className="w-full flex items-center justify-center px-6 py-3 bg-[#001C55] text-white rounded-lg hover:bg-[#242c3b] transition-colors duration-300"
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Loader2 className="h-12 w-12 animate-spin text-[#001C55]" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-red-50 text-red-600">
                <p className="text-xl">{error}</p>
            </div>
        );
    }

    const startScanner = () => {
        setIsScanning(true);
        // Implement your barcode scanning logic here using scannerRef.current
        // For example, you might use a library like QuaggaJS or JsBarcode
        // After scanning, call setScannedCode with the result
        // and stopScanner to close the modal.
    };

    const stopScanner = () => {
        setIsScanning(false);
        setScannerError('');
    };


    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            {/* Search and Scan Section */}
            <div className="mb-8 relative">
                <div className="relative flex items-center shadow-md rounded-lg overflow-hidden">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-3 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all duration-300"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={startScanner}
                        className="px-6 py-3 bg-[#0a2472] text-white hover:bg-[#242c3b] transition-colors duration-300 flex items-center"
                    >
                        <Camera className="h-5 w-5 mr-2" /> Scan
                    </button>
                </div>
            </div>

            {/* Scanner Modal */}
            {isScanning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-[#0a2472] text-white p-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Scan Barcode</h2>
                            <button onClick={stopScanner} className="hover:bg-[#252c42] p-1 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <Scanner />
                        {scannerError ? (
                            <div className="p-4 bg-red-50 text-red-600">
                                {scannerError}
                            </div>
                        ) : (
                            <>
                                <div ref={scannerRef} className="w-full h-64 bg-gray-200" />
                                <div className="p-4 text-center text-gray-600">
                                    Position barcode within the frame
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Scanned Code Notification */}
            {scannedCode && (
                <div className="fixed top-20 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
                    <p>Scanned Code: <strong>{scannedCode}</strong></p>
                    <button
                        onClick={() => setScannedCode('')}
                        className="mt-2 text-sm bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Products Grid */}
            <div className="flex gap-8">
                <Sidebar
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                        >
                            <Suspense fallback={<div className="h-64 bg-gray-200 animate-pulse" />}>
                                <div className="h-64 flex items-center justify-center p-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            </Suspense>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{product.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-extrabold text-[#001C55]">${product.price.toFixed(2)}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        className="px-5 py-2 bg-[#0a2472] text-white rounded-md hover:bg-[#242c3b] transition-colors duration-300 flex items-center"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Details Modal */}
            {renderProductDetailsModal()}
        </div>
    );
}

export default Products;