import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      <p>epudiandae debitis nulla. Iste excepturi commodi sequi voluptates iure, possimus corporis fuga, harum pariatur beatae vero ut voluptatum facilis cumque totam quas mollitia eveniet debitis blanditiis! Nulla eligendi soluta inventore veniam odio possimus error incidunt dolores quis odit, illum sed illo minima accusantium ex molestias deserunt voluptate facere! Iste est, nostrum doloribus similique amet nobis saepe. Neque iste eveniet rerum cupiditate laudantium autem voluptatum ipsa quas vero dicta, amet qui voluptatibus illum sint aperiam reprehenderit itaque! Corrupti, ducimus facere adipisci eaque laboriosam nam quaerat voluptate quae voluptatibus explicabo quas reiciendis quisquam veniam expedita. Porro praesentium placeat deleniti dolores maiores odio quaerat voluptate nemo, sit officia neque sapiente magni ducimus earum, tempora repellat corrupti accusamus! Velit alias saepe reprehenderit ratione placeat delectus quisquam accusamus, temporibus quis sed, ducimus tenetur ullam magnam. Architecto qui harum itaque impedit quaerat. Aperiam qui quisquam voluptatibus ea? Quae mollitia harum natus nulla corporis suscipit a cum perspiciatis assumenda necessitatibus ipsa ex optio unde sed laboriosam blanditiis culpa reprehenderit ipsum beatae, soluta ullam quasi, expedita dicta? Id sapiente optio, provident quasi quidem eos adipisci autem dolorum omnis molestiae dolo.</p>
    </>
  );
}