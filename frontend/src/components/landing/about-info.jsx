export default function AboutInfo() {
    return (
      <section id="about" className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">About Us</h2>
          <p className="text-lg max-w-3xl mx-auto mb-6">
            HospitalQ is dedicated to streamlining hospital bed management and
            patient care through real-time monitoring and efficient resource allocation.
            Our mission is to provide seamless experiences for hospitals and patients alike.
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  }