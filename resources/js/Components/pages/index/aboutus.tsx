import { Button } from "@/Components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutUs() {
  return (
    <section id="about" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">About Us</h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-300">
              We are a team of passionate individuals dedicated to creating innovative solutions that make a difference.
              Our mission is to empower businesses and individuals with cutting-edge technology.
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <Button size="lg">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://9253440.fs1.hubspotusercontent-na1.net/hub/9253440/hubfs/Happy-work-team-cheering-and-celebrating-at-meeting-team-collaboration.jpg?width=1505&height=750&name=Happy-work-team-cheering-and-celebrating-at-meeting-team-collaboration.jpg"
                alt="Team working together"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

