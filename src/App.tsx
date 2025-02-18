<<<<<<< HEAD
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { Tour, TourFormData } from './types/Tour';
import { TourForm } from './components/TourForm';
import './style/common.css';
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";


const API_URL = 'http://localhost:8080/api/v1';
const PAGE_SIZE = 20; // Number of items per page

function App() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [totalTours, setTotalTours] = useState(0);

  const [travelImgPreviews, setTravelImgPreviews] = useState<{ [key: string]: string }>({});

  const handleImageChange = (e, tourId: string) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTravelImgPreviews((prevState) => ({
          ...prevState,
          [tourId]: event.target.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setTravelImgPreviews((prevState) => {
        const newState = { ...prevState };
        delete newState[tourId];
        return newState;
      });
    }
  };

  useEffect(() => {
    fetchTours(currentPage);
  }, [currentPage]);

  const fetchTours = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tours?page=${page}&limit=${PAGE_SIZE}`);
      setTours(response.data.data);
      setTotalTours(response.data.total);
      setError('');
    } catch (err) {
      setError('Failed to fetch tours');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tours/search/getTourBySearch?city=${searchQuery}`);
      setTours(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to search tours');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTour = async (data: TourFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('distance', data.distance.toString());
    formData.append('price', data.price.toString());
    formData.append('maxGroupSize', data.maxGroupSize.toString());
    formData.append('desc', data.desc);
    formData.append('featured', data.featured ? 'true' : 'false');

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    try {
      await axios.post(`${API_URL}/tours`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchTours(currentPage);
      setShowForm(false);
      alert('Added successfully');
    } catch (err) {
      setError('Failed to add tour');
      console.error(err);
    }
  };

  const handleUpdateTour = async (data: TourFormData) => {
    if (!selectedTour) return;

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('distance', data.distance.toString());
    formData.append('price', data.price.toString());
    formData.append('maxGroupSize', data.maxGroupSize.toString());
    formData.append('desc', data.desc);
    formData.append('featured', data.featured ? 'true' : 'false');

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    try {
      await axios.put(`${API_URL}/tours/${selectedTour._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchTours(currentPage);
      setShowForm(false);
      setSelectedTour(null);
    } catch (err) {
      setError('Failed to update tour');
      console.error(err);
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    try {
      await axios.delete(`${API_URL}/tours/${id}`);
      fetchTours(currentPage);
    } catch (err) {
      setError('Failed to delete tour');
      console.error(err);
    }
  };

  const totalPages = Math.ceil(totalTours / PAGE_SIZE);

  return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tour Management Admin</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your tours, packages, and featured destinations
            </p>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                    type="text"
                    placeholder="Search by city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" onClick={handleSearch} />
              </div>
            </div>

            <button
                onClick={() => setShowForm(true)}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Tour
            </button>
          </div>

          {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
          )}

          {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              </div>
          ) : (
              <>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TITLE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tour
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Group Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {tours.map((tour) => (
                        <tr key={tour._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={travelImgPreviews[tour._id] || 'default-image-url'}
                                    alt={tour.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.city}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.city}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${tour.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.maxGroupSize}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.featured ? 'Yes' : 'No'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                                onClick={() => {
                                  setSelectedTour(tour);
                                  setShowForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-900 mr-3 rounded-full"
                            >
                              <Edit2 className="h-5 w-5"/>
                            </button>
                            <button
                                onClick={() => handleDeleteTour(tour._id)}
                                className="text-red-600 hover:text-red-900 rounded-full"
                            >
                              <Trash2 className="h-5 w-5"/>
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className="px-4 py-2 bg-green-600 text-white rounded-full disabled:opacity-50"
                      disabled={currentPage === 1}>Previous
                  </button>
                  <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
                  <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className="px-4 py-2 bg-orange-500 text-white rounded-full disabled:opacity-50"
                      disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>

              </>
          )}
        </div>

        {showForm && (
            <TourForm
                onClose={() => setShowForm(false)}
                onSubmit={selectedTour ? handleUpdateTour : handleAddTour}
                tour={selectedTour}
            />
        )}
        <Footer />
      </div>
  );
}

export default App;
=======

import './App.css'

function App() {

  return (
    <>

    </>
  )
}

export default App
>>>>>>> f9700df37d881075e518d42bb5488fb5a1e13232
