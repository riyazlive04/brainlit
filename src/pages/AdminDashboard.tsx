import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { supabase, Registration, WebinarSettings } from "@/lib/supabase";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import { Home, RefreshCw, Calendar } from "lucide-react";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [webinarDate, setWebinarDate] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [isSavingDate, setIsSavingDate] = useState(false);

  // filter/group by webinar date ('all' means no filter)
  const [filterDate, setFilterDate] = useState<string>("all");

  useEffect(() => {
    fetchRegistrations();
    fetchWebinarSettings();
  }, []);

  // when webinarDate is retrieved, use it as default filter
  useEffect(() => {
    if (webinarDate) {
      setFilterDate(webinarDate);
    }
  }, [webinarDate]);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching registrations from Supabase...");
      
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("webinar_date", { ascending: false })
        .order("registered_at", { ascending: false });

      console.log("Supabase response:", { data, error });
      if (data && data.length > 0) {
        console.log("first registration object", data[0]);
        console.log("registration keys", Object.keys(data[0]));
      }

      if (error) {
        console.error("Supabase error details:", error);
        toast.error(`Database error: ${error.message}`);
        throw error;
      }

      console.log(`Successfully fetched ${data?.length || 0} registrations`);
      setRegistrations(data || []);
      
      if (!data || data.length === 0) {
        toast.info("No registrations found in database");
      }
    } catch (error: any) {
      console.error("Error fetching registrations:", error);
      toast.error(`Failed to fetch registrations: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWebinarSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("webinar_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching webinar settings:", error);
        return;
      }

      if (data?.next_webinar_date) {
        // Convert to datetime-local format (YYYY-MM-DDTHH:MM)
        const date = new Date(data.next_webinar_date);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        setWebinarDate(localDate.toISOString().slice(0, 16));
      }
      if (data?.meeting_link) {
        setMeetingLink(data.meeting_link);
      }
    } catch (error: any) {
      console.error("Error fetching webinar settings:", error);
    }
  };

  const saveWebinarDate = async () => {
    if (!webinarDate) {
      toast.error("Please select a date and time");
      return;
    }

    // meetingLink may be empty string; that's okay
    try {
      const { data: existing } = await supabase
        .from("webinar_settings")
        .select("*")
        .limit(1)
        .single();

      const dateToSave = new Date(webinarDate).toISOString();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from("webinar_settings")
          .update({ 
            next_webinar_date: dateToSave,
            meeting_link: meetingLink,
            updated_at: new Date().toISOString()
          })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from("webinar_settings")
          .insert({ 
            next_webinar_date: dateToSave,
            meeting_link: meetingLink,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      }

      toast.success("Webinar date updated successfully!");
    } catch (error: any) {
      console.error("Error saving webinar date:", error);
      toast.error(`Failed to save webinar date: ${error.message}`);
    } finally {
      setIsSavingDate(false);
    }
  };

  // delete a registration (lead) by id
  const handleDelete = async (id: number | string | undefined) => {
    console.log("handleDelete invoked with id", id);
    if (id == null) {
      console.error("handleDelete called without id", id);
      toast.error("Unable to delete: missing registration ID");
      return;
    }

    const proceed = window.confirm("Are you sure you want to delete this registration? This cannot be undone.");
    if (!proceed) return;

    try {
      const response = await supabase
        .from("registrations")
        .delete()
        // always use the `id` column; its type may be uuid
        .eq("id", id as any)
        // ask for rows back so we can verify
        .select();

      console.log("delete response", response);

      if (response.error) {
        throw response.error;
      }

      if (!response.data || response.data.length === 0) {
        toast.error("No record was removed. Check database permissions or ID.");
        // fetch registrations anyway to see true state
        fetchRegistrations();
        return;
      }

      toast.success("Registration deleted.");
      // update local state then re-sync with server
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
      fetchRegistrations();
    } catch (error: any) {
      console.error("Error deleting registration:", error);
      toast.error(`Failed to delete registration: ${error.message}`);
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportToCSV = () => {
    const headers = ["ID", "Parent Name", "WhatsApp", "Email", "Location", "Registered At", "Webinar Date", "Meeting Link"];
    const csvData = registrations.map((reg) => [
      reg.id,
      reg.parent_name,
      reg.whatsapp,
      reg.email,
      reg.location,
      reg.registered_at,
      reg.webinar_date,
      reg.meeting_link || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `brainlit-registrations-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exported successfully!");
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Dashboard - BrainLit</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Webinar Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Webinar Settings
              </CardTitle>
              <CardDescription>Set the next webinar date and time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="webinarDate">Next Webinar Date & Time</Label>
                  <Input
                    id="webinarDate"
                    type="datetime-local"
                    value={webinarDate}
                    onChange={(e) => setWebinarDate(e.target.value)}
                    className="h-12"
                  />
                  <Label htmlFor="meetingLink" className="mt-4">Meeting Link (URL)</Label>
                  <Input
                    id="meetingLink"
                    type="url"
                    placeholder="https://..."
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button 
                  onClick={saveWebinarDate} 
                  disabled={isSavingDate}
                  className="h-12"
                >
                  {isSavingDate ? "Saving..." : "Save Webinar Date"}
                </Button>
              </div>
              {webinarDate && (
                <p className="text-sm text-muted-foreground mt-2">
                  Current: {new Date(webinarDate).toLocaleString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Registrations Card */}
        <Card className="max-w-7xl mx-auto">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">Admin Dashboard</CardTitle>
                <CardDescription className="mt-2">
                  Manage webinar registrations ({registrations.length} total)
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchRegistrations}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading registrations...</p>
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No registrations found</p>
              </div>
            ) : (
              <>
                {/* filter by webinar date */}
                <div className="mb-4 flex items-center gap-4">
                  <Label htmlFor="filterDate" className="text-sm font-medium">
                    Show webinar:
                  </Label>
                  <Select
                    value={filterDate}
                    onValueChange={(val) => setFilterDate(val)}
                  >
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="All dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All dates</SelectItem>
                      {Array.from(
                        new Set(registrations.map((r) => r.webinar_date).filter(Boolean as any))
                      )
                        .sort((a, b) =>
                          new Date(b).getTime() - new Date(a).getTime()
                        )
                        .map((date) => (
                          <SelectItem key={date} value={date}>
                            {new Date(date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* group by date */}
                {Object.entries(
                  registrations.reduce<Record<string, Registration[]>>((acc, reg) => {
                    const key = reg.webinar_date || "Unknown";
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(reg);
                    return acc;
                  }, {})
                )
                  .filter(([date]) => filterDate === "all" || date === filterDate)
                  .map(([date, group]) => (
                    <div key={date} className="mb-8">
                      <p className="text-lg font-semibold mb-2">
                        Webinar: {new Date(date).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[60px]">ID</TableHead>
                              <TableHead>Parent Name</TableHead>
                              <TableHead>WhatsApp</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Meeting Link</TableHead>
                              <TableHead>Registered At</TableHead>
                              <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {group.map((registration) => (
                              <TableRow key={registration.id}>
                                <TableCell className="font-medium">
                                  {registration.id}
                                </TableCell>
                                <TableCell>{registration.parent_name}</TableCell>
                                <TableCell>{registration.whatsapp}</TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                  {registration.email}
                                </TableCell>
                                <TableCell>{registration.location}</TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                  {registration.meeting_link ? (
                                    <a href={registration.meeting_link} target="_blank" rel="noopener noreferrer" className="text-secondary underline">
                                      Link
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                  {formatDate(registration.registered_at)}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(registration.id)}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
