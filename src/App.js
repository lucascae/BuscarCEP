import React, { useState } from 'react';
import './App.css';

import InputMask from "react-input-mask";

function App(props) {
  
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');

  const [errorMessage, setMessage] = useState(false);

  async function getCep(){
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      const { logradouro, bairro, localidade, uf } = data;
      setMessage(false);
      setLogradouro(logradouro);
      setBairro(bairro);
      setLocalidade(localidade);
      setUf(uf);
    } catch (error) {
      setMessage(true);
      setLogradouro('');
      setBairro('');
      setLocalidade('');
      setUf('');
    }
  }

  return (
    <div className="App container-fluid">
      <form className="row">
        <div className="col-12 pt-3">
          <div className="form-group row">
            <div className="form-group col-md-4">
                <label htmlFor="inputCep">CEP</label>
                <div className="input-group">
                    <InputMask mask='99999-999' className="form-control" id="inputCEP" placeholder="CEP" aria-label="inputCep" aria-describedby="inputCep" onChange={event => setCep(event.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-info" type="button" id="btnCep" onClick={getCep}>Pesquisar Endereço</button>
                    </div>
                </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="form-group col-md-3">
                <label htmlFor="inputLogradouro">Logradouro</label>
                <input type="text" className="form-control" id="inputLogradouro" placeholder="Ex: Rua, Avenida, ..." onChange={event => setLogradouro(event.target.value)} value={logradouro} />
            </div>
            <div className="form-group col-md-1">
                <label htmlFor="inputLogradouro">Número</label>
                <input type="text" className="form-control" id="inputNumero" placeholder="Nº" />
            </div>
          </div>
          <div className="form-group row">
            <div className="form-group col-md-4">
                <label htmlFor="inputBairro">Bairro</label>
                <input type="text" className="form-control" id="inputBairro" placeholder="Bairro" onChange={event => setBairro(event.target.value)} value={bairro} />
            </div>
          </div>
          <div className="form-group row">
            <div className="form-group col-md-2">
                <label htmlFor="inputLocalidade">Localidade</label>
                <input type="text" className="form-control" id="inputLocalidade" placeholder="Localidade" onChange={event => setLocalidade(event.target.value)} value={localidade} />
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputUf">Uf</label>
                <input type="text" className="form-control" id="inputUf" placeholder="Uf" onChange={event => setUf(event.target.value)} value={uf} />
            </div>
          </div>
        </div>
        {errorMessage && <div>Não foi possivel encontrar este CEP</div>}
      </form>
    </div>
  );
}

export default App;
