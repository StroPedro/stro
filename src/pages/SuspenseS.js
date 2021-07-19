import React , {Suspense} from "react"
import MostrarMateria from "./mostrarMateria"
import Blog from "./Blog"

function ProfilePage() {
    return (
      <Suspense fallback={<p>ccccccc</p>}>
        <Blog/>
      </Suspense>
    );
}

export  default ProfilePage ;