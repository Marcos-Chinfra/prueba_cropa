import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const ListOfPokemons = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getPokemons = async (numPokemons) => {
    try {
      const requests = [];
      for (let i = 1; i <= numPokemons; i++) {
        requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const responses = await Promise.all(requests);
      const data = responses.map((response) => response.data);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (item) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    getPokemons(10);
  }, []);
  console.log(data);
  return (
    <>
      <section>
        {isModalOpen && selectedItem && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div key={selectedItem.id} onClick={handleOpenModal}>
              <figure>
                <img src={selectedItem.sprites.front_default} alt="" />
                <img src={selectedItem.sprites.back_default} alt="" />
              </figure>
              <article>
                <ul>
                  <li>
                    <b>Nombre</b>: {selectedItem.name}
                  </li>
                  <li>
                    <b>id</b>: {selectedItem.id}
                  </li>
                  <li>
                    <b>Habilidades</b>:
                    {selectedItem.abilities.map((ability) => (
                      <ul>
                        <li>{ability.ability.name}</li>
                      </ul>
                    ))}
                  </li>
                  <li>
                    <b>Tipo</b>: {selectedItem.types.map((type) => `${type.type.name} `)}
                  </li>
                </ul>
              </article>
            </div>
          </Modal>
        )}
        <ul>
          {data &&
            data.map((item) => (
              <div key={item.id} onClick={() => handleOpenModal(item)}>
                <figure>
                  <img src={item.sprites.front_default} alt="" />
                </figure>
                <article>
                  <ul>
                    <li>
                      <b>Numero</b>: {item.id}
                    </li>
                    <li>
                      <b>Nombre</b>: {item.name}
                    </li>
                    <li>
                      <b>Tipo</b>: {item.types.map((type) => `${type.type.name} `)}
                    </li>
                  </ul>
                </article>
              </div>
            ))}
        </ul>
      </section>
    </>
  );
};

export default ListOfPokemons;
