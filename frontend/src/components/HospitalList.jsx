import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const hospitals = [
  { id: 1, name: "Central Hospital", availableBeds: 5 },
  { id: 2, name: "City Medical Center", availableBeds: 3 },
  { id: 3, name: "Community Health Hospital", availableBeds: 7 },
]

function HospitalList() {
  return (
    (<div>
      <h2 className="text-2xl font-semibold mb-4">Available Hospitals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Available Beds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hospitals.map((hospital) => (
            <TableRow key={hospital.id}>
              <TableCell>{hospital.name}</TableCell>
              <TableCell>{hospital.availableBeds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>)
  );
}

export default HospitalList

