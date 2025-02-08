import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const patients = [
  { id: 1, name: "John Doe", status: "Waiting", requestDate: "2023-05-01" },
  { id: 2, name: "Jane Smith", status: "Admitted", requestDate: "2023-05-02" },
  { id: 3, name: "Bob Johnson", status: "Waiting", requestDate: "2023-05-03" },
]

function PatientManagement() {
  return (
    (<div>
      <h2 className="text-2xl font-semibold mb-4">Patient Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>
                <Badge variant={patient.status === "Waiting" ? "secondary" : "success"}>{patient.status}</Badge>
              </TableCell>
              <TableCell>{patient.requestDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>)
  );
}

export default PatientManagement

