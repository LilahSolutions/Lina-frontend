import { API_METRICS_BASE_URL } from './constants';
import { isDevelopment } from '@/common/constants';

/** Disable tracking in development mode.*/
const TRACKING_DISABLED = isDevelopment && true; // Switch this value to false to enable tracking in development mode.

/** Sends analytics data to the backend. */
