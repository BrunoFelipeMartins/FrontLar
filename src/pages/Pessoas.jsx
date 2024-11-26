import axios from "axios";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import "./pessoas.css";

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/pessoas")
      .then(response => {
        setPessoas(response.data);
      })
      .catch(error => {
        console.error("Erro ao carregar pessoas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const adicionarPessoa = async () => {
    const nome = prompt("Digite o nome:");
    if (nome) {
      try {
        const response = await axios.post("http://localhost:5000/api/pessoas", { nome });
        setPessoas((prevPessoas) => [...prevPessoas, response.data]);
      } catch (error) {
        console.error("Erro ao adicionar pessoa:", error);
      }
    }
  };

  const inativarPessoa = async (id) => {
    if (window.confirm("Tem certeza que deseja inativar?")) {
      try {
        await axios.put(`http://localhost:5000/api/pessoas/${id}/inativar`);
        setPessoas(pessoas.map(pessoa =>
          pessoa.id === id ? { ...pessoa, isActive: false } : pessoa
        ));
      } catch (error) {
        console.error("Erro ao inativar pessoa:", error);
      }
    }
  };

  const editarPessoa = async (id) => {
    const nome = prompt("Digite o novo nome:");
    if (nome) {
      try {
        await axios.put(`http://localhost:5000/api/pessoas/${id}`, { nome });
        setPessoas(pessoas.map((pessoa) =>
          pessoa.id === id ? { ...pessoa, nome } : pessoa
        ));
      } catch (error) {
        console.error("Erro ao editar pessoa:", error);
      }
    }
  };

  return (
    <div>
      <h1>Pessoas</h1>
      <Menu />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <button onClick={adicionarPessoa}>Cadastrar Pessoa</button>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data Nascimento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{pessoa.id}</td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.cpf}</td>
                  <td>{pessoa.dateBith}</td>
                  <td>{pessoa.isActive ? "Ativo" : "Inativo"}</td>
                  <td>
                    {pessoa.isActive ? (
                      <>
                        <button onClick={() => editarPessoa(pessoa.id)}>Editar</button>
                        <button onClick={() => inativarPessoa(pessoa.id)}>Inativar</button>
                      </>
                    ) : (
                      <span>Inativo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Pessoas;
