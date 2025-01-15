
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const jobService = {
  async getAllJobs(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.employmentType) queryParams.append('employmentType', filters.employmentType);
      if (filters.workExperience) queryParams.append('workExperience', filters.workExperience);
      if (filters.dateOfPosting) queryParams.append('dateOfPosting', filters.dateOfPosting);

      const response = await axios.get(`${API_URL}/jobs/view-jobs?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};