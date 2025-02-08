import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const hospitals = [
  { id: 1, name: "Central Hospital", totalBeds: 100, availableBeds: 5 },
  { id: 2, name: "City Medical Center", totalBeds: 80, availableBeds: 3 },
  { id: 3, name: "Community Health Hospital", totalBeds: 120, availableBeds: 7 },
]

function BedManagement() {
  return (
    (<div>
      <h2 className="text-2xl font-semibold mb-4">Bed Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Total Beds</TableHead>
            <TableHead>Available Beds</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hospitals.map((hospital) => (
            <TableRow key={hospital.id}>
              <TableCell>{hospital.name}</TableCell>
              <TableCell>{hospital.totalBeds}</TableCell>
              <TableCell>{hospital.availableBeds}</TableCell>
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

export default BedManagement

