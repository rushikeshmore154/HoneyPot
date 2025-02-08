import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminDashboard from "../components/AdminDashboard"
import BedManagement from "../components/BedManagement"
import PatientManagement from "../components/PatientManagement"

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hospital Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="beds">Bed Management</TabsTrigger>
          <TabsTrigger value="patients">Patient Management</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <AdminDashboard />
        </TabsContent>
        <TabsContent value="beds">
          <BedManagement />
        </TabsContent>
        <TabsContent value="patients">
          <PatientManagement />
        </TabsContent>
      </Tabs>
    </div>)
  );
}

export default Admin

