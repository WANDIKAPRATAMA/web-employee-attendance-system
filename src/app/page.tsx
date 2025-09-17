// app/page.tsx
import Link from "next/link";
import {
  Code,
  Database,
  Layers,
  Shield,
  Zap,
  GitBranch,
  Cpu,
  CheckCircle,
  FileCode,
  Workflow,
  Warehouse,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Modular Frontend Architecture
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
            A scalable, maintainable architecture for modern web applications
            using the Repository Pattern with seamless backend switching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/dashboard/attendance">View Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#architecture">Explore Architecture</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section
        id="architecture"
        className="py-16 px-4 bg-white dark:bg-slate-800"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Architecture Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <CardTitle className="text-center">
                  Repository Pattern
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-300">
                  Abstracts data access logic for seamless backend switching
                  between REST API and any.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle className="text-center">Validation First</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-300">
                  Uses Zod for schema validation to ensure data integrity at
                  every layer.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <GitBranch className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <CardTitle className="text-center">Modular Design</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-300">
                  Self-contained modules for Auth, Products, Stocks, Warehouses,
                  and Dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <CardTitle className="text-center">Type Safety</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-300">
                  Full TypeScript support with inferred types from validation
                  schemas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Architecture Diagram */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Architecture Flow
            </h3>
            <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-white dark:bg-slate-600 rounded-lg shadow-md text-center w-48">
                      <div className="flex justify-center mb-2">
                        <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold">UI Component</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        User Interaction
                      </p>
                    </div>
                    <div className="mt-2 text-2xl">↓</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-white dark:bg-slate-600 rounded-lg shadow-md text-center w-48">
                      <div className="flex justify-center mb-2">
                        <FileCode className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-semibold">Action Functions</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Business Logic
                      </p>
                    </div>
                    <div className="mt-2 text-2xl">↓</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-white dark:bg-slate-600 rounded-lg shadow-md text-center w-48">
                      <div className="flex justify-center mb-2">
                        <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-semibold">Repository Factory</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Backend Selection
                      </p>
                    </div>
                    <div className="mt-2 text-2xl">↓</div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-white dark:bg-slate-600 rounded-lg shadow-md text-center w-48">
                      <div className="flex justify-center mb-2">
                        <Code className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h4 className="font-semibold">REST Implementation</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        API Calls
                      </p>
                    </div>
                    <div className="mt-2 text-2xl">↓</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-white dark:bg-slate-600 rounded-lg shadow-md text-center w-48">
                      <div className="flex justify-center mb-2">
                        <Workflow className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <h4 className="font-semibold">Service Functions</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Data Processing
                      </p>
                    </div>
                    <div className="mt-2 text-2xl">↓</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-white dark:bg-slate-600 rounded-lg shadow-md text-center w-48">
                      <div className="flex justify-center mb-2">
                        <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold">Backend API</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Data Source
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module Structure */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Module Structure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-md mr-3">
                      <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Validation
                  </CardTitle>
                  <CardDescription>
                    Zod schemas for request/response types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Input validation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Type inference</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Error handling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-green-100 dark:bg-green-800 rounded-md mr-3">
                      <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    Actions
                  </CardTitle>
                  <CardDescription>Public API for modules</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Token validation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Repository instantiation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Response handling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-md mr-3">
                      <GitBranch className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    Repository
                  </CardTitle>
                  <CardDescription>
                    Abstracts data source implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Interface definition</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Factory pattern</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Backend switching</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-md mr-3">
                      <Database className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    Services
                  </CardTitle>
                  <CardDescription>REST API implementation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">API communication</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Error processing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Response validation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-red-100 dark:bg-red-800 rounded-md mr-3">
                      <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    Interfaces
                  </CardTitle>
                  <CardDescription>
                    TypeScript contract definitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Method signatures</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Implementation contract</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Type enforcement</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-md mr-3">
                      <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    Shared Utilities
                  </CardTitle>
                  <CardDescription>
                    Common components and functions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">API response types</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Fetch utilities</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Error formatting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 px-4 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Implemented Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md mr-3">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Authentication
                </CardTitle>
                <CardDescription>User management and security</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Sign up / Sign in</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Password management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Token validation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md mr-3">
                    <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  Products
                </CardTitle>
                <CardDescription>Product catalog management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>CRUD operations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Category management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>SKU validation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md mr-3">
                    <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Product Stocks
                </CardTitle>
                <CardDescription>Inventory management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Stock tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Low stock alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Inventory updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-md mr-3">
                    <Warehouse className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  Warehouse Locations
                </CardTitle>
                <CardDescription>Storage management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Location CRUD</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Capacity tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Stock allocation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-md mr-3">
                    <Zap className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  Dashboard
                </CardTitle>
                <CardDescription>Overview and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Stock summary</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Low stock alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Recent activity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-md mr-3">
                    <Workflow className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  API Integration
                </CardTitle>
                <CardDescription>Backend communication</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>RESTful services</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Error handling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Supabase compatibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Explore the Implementation?
          </h2>
          <p className="text-blue-100 mb-10 text-lg">
            Experience the modular architecture in action with our fully
            functional dashboard.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
