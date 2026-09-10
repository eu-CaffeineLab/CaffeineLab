import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../lib/supabase';
import Link from 'next/link';

export default function Admin() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nameEn: '',
    nameKa: '',
    descriptionEn: '',
    descriptionKa: '',
    price: '',
    image: '☕',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!formData.nameEn || !formData.price) {
      alert('Please fill in required fields');
      return;
    }

    const productData = {
      name_en: formData.nameEn,
      name_ka: formData.nameKa,
      description_en: formData.descriptionEn,
      description_ka: formData.descriptionKa,
      price: parseFloat(formData.price),
      image: formData.image,
    };

    if (editingId) {
      await updateProduct(editingId, productData);
      setEditingId(null);
    } else {
      await addProduct(productData);
    }

    setFormData({
      nameEn: '',
      nameKa: '',
      descriptionEn: '',
      descriptionKa: '',
      price: '',
      image: '☕',
    });
    setIsAdding(false);
    loadProducts();
  };

  const handleEdit = (product) => {
    setFormData({
      nameEn: product.name_en,
      nameKa: product.name_ka,
      descriptionEn: product.description_en,
      descriptionKa: product.description_ka,
      price: product.price,
      image: product.image,
    });
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="coffee-gradient text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">CaffeineLab Admin 🔧</h1>
          <Link href="/shop">
            <button className="bg-white text-coffee px-6 py-2 rounded-lg font-bold hover:bg-gray-100">
              ← Back to Shop
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            setFormData({
              nameEn: '',
              nameKa: '',
              descriptionEn: '',
              descriptionKa: '',
              price: '',
              image: '☕',
            });
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold mb-6 text-lg"
        >
          {isAdding ? '❌ Cancel' : '➕ Add New Product'}
        </button>

        {isAdding && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-coffee mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Product Name (English)*</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., Lavazza Crema e Aroma"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Product Name (Georgian)</label>
                <input
                  type="text"
                  value={formData.nameKa}
                  onChange={(e) => setFormData({ ...formData, nameKa: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="ლავაზა ქრემა ე არომა"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-bold mb-2">Description (English)</label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-20"
                  placeholder="Product description"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Description (Georgian)</label>
                <textarea
                  value={formData.descriptionKa}
                  onChange={(e) => setFormData({ ...formData, descriptionKa: e.target.value })}
                  className="w-full border rounded px-3 py-2 h-20"
                  placeholder="აღწერა ქართულად"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-bold mb-2">Price (Lari)*</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Emoji Icon</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-2xl"
                  placeholder="☕"
                  maxLength="2"
                />
              </div>
            </div>

            <button
              onClick={handleAddProduct}
              className="mt-6 w-full bg-coffee hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
            >
              {editingId ? '💾 Update Product' : '✅ Add Product'}
            </button>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-coffee mb-4">All Products ({products.length})</h2>
          {products.length === 0 ? (
            <p className="text-gray-600 text-lg">No products yet. Add your first coffee! ☕</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-5xl mb-3">{product.image}</div>
                    <h3 className="text-2xl font-bold text-coffee">{product.name_en}</h3>
                    <p className="text-gray-600 text-sm mb-2">({product.name_ka})</p>
                    <p className="text-gray-700 mb-2">{product.description_en}</p>
                    <p className="text-gray-600 text-sm mb-3">{product.description_ka}</p>
                    <p className="text-3xl font-bold text-green-600">₾{product.price}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
