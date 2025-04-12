
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <UtensilsCrossed className="h-6 w-6 text-god-green mr-2" />
              <span className="text-xl font-bold text-god-green">Gods Own Food</span>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered meal planning and grocery shopping for a healthier lifestyle.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-god-green">AI Meal Planner</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Recipe Recommendations</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Smart Grocery Lists</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Store Connections</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Nutrition Tracking</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-god-green">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">For Grocery Stores</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Careers</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Blog</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Help Center</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-god-green">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Gods Own Food. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-500 hover:text-god-green">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-god-green">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.258 1.234.621 1.799 1.186s.928 1.13 1.186 1.798c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.186 1.799c-.565.565-1.13.928-1.798 1.186-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.799-1.186 4.902 4.902 0 01-1.186-1.798c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.186-1.799c.565-.565 1.13-.928 1.798-1.186.636-.247 1.363-.416 2.427-.465C9.576 2.013 9.92 2 12.315 2zm0 1.802h-.142c-2.353 0-2.677.01-3.716.058-.997.045-1.538.213-1.896.352-.477.184-.818.403-1.177.766-.361.361-.58.702-.765 1.177-.14.356-.307.897-.351 1.895-.049 1.039-.058 1.366-.058 3.716v.144c0 2.353.01 2.677.058 3.716.045.997.213 1.538.351 1.896.184.477.404.818.765 1.177.361.361.7.582 1.177.765.356.14.897.307 1.895.351 1.02.046 1.33.058 3.716.058 2.387 0 2.696-.012 3.716-.058.997-.045 1.538-.213 1.896-.351.478-.184.819-.404 1.177-.765.362-.361.582-.7.766-1.177.14-.356.307-.897.351-1.895.046-1.02.058-1.33.058-3.716 0-2.387-.012-2.696-.058-3.716-.045-.997-.213-1.538-.351-1.896a3.09 3.09 0 00-.766-1.177 3.09 3.09 0 00-1.177-.765c-.356-.14-.897-.307-1.896-.351-1.039-.049-1.363-.058-3.716-.058zM12.173 15.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm0-8.444a5.112 5.112 0 100 10.222 5.112 5.112 0 000-10.222zm6.56-1.111a1.223 1.223 0 11-2.446 0 1.223 1.223 0 012.447 0z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-god-green">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
