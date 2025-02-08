import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function RequestForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    (<div>
      <h2 className="text-2xl font-semibold mb-4">Request Bed Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" required />
        </div>
        <div>
          <Label htmlFor="message">Additional Information</Label>
          <Textarea id="message" />
        </div>
        <Button type="submit">Submit Request</Button>
      </form>
    </div>)
  );
}

export default RequestForm

