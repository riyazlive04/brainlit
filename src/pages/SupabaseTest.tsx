import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SupabaseTest = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      console.log("Testing Supabase connection...");
      console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
      console.log("Has Anon Key:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      // Test basic query
      const { data, error, count } = await supabase
        .from("registrations")
        .select("*", { count: "exact" });
      
      setResult({
        success: !error,
        data: data,
        error: error,
        count: count,
        timestamp: new Date().toISOString(),
      });
      
      console.log("Test result:", { data, error, count });
    } catch (err: any) {
      console.error("Test error:", err);
      setResult({
        success: false,
        error: err.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={testConnection} disabled={loading}>
            {loading ? "Testing..." : "Test Connection"}
          </Button>
          
          {result && (
            <div className="mt-4">
              <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupabaseTest;
