import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const stepPBB = [
    "Pembuatan Nopel", 
    "Pemeriksaan Pendata",
    "Pengiriman Ke Badan",
    "SPPT Jadi",
    "Pending"
]

const FormAddProduct = () => {

    const [nopel, setNopel] = useState("");
    const [name, setName] = useState("");
    const [nop, setNop] = useState("");
    const [lt, setLt] = useState();
    const [lb, setLb] = useState();
    const [kec, setKec] = useState("");
    const [tahapan, setTahapan] = useState("");
    const [ket, setKet] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveProduct = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products', {
                nopel: nopel,
                name: name,
                nop: nop,
                lt: lt,
                lb: lb,
                kec: kec,
                tahapan: tahapan,
                ket: ket
            })
            navigate("/products")
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }

  return (
    <div>
        <h1 className='title'>Products</h1>
      <h2 className='subtitle'>Add New Products</h2>
      <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
                <form onSubmit={saveProduct}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className="field">
                        <label className='label'>Nopel</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className='input'
                                value={nopel}
                                onChange={(e) => setNopel(e.target.value)}
                                placeholder='Nopel' 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Nama</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className='input' 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name' 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Nop</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className='input' 
                                value={nop}
                                onChange={(e) => setNop(e.target.value)}
                                placeholder='Nop' 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Luas Tanah</label>
                        <div className="control">
                            <input 
                                type="number" 
                                className='input' 
                                value={lt}
                                onChange={(e) => setLt(e.target.value)}
                                placeholder='Luas Tanah' 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Luas Bangunan</label>
                        <div className="control">
                            <input 
                                type="number" 
                                className='input' 
                                value={lb}
                                onChange={(e) => setLb(e.target.value)}
                                placeholder='Luas Bangunan' 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Kecamatan</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className='input' 
                                value={kec}
                                onChange={(e) => setKec(e.target.value)}
                                placeholder='Kecamatan' 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Tahapan</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select 
                                    value={tahapan}
                                    onChange={(e) => setTahapan(e.target.value)}
                                >
                                    <option value="pembuatan nopel">{stepPBB[0]}</option>
                                    <option value="pemeriksaan pendata">{stepPBB[1]}</option>
                                    <option value="pengiriman ke badan">{stepPBB[2]}</option>
                                    <option value="SPPT jadi">{stepPBB[3]}</option>
                                    <option value="Pending">{stepPBB[4]}</option>
                                </select>
                            </div>
                        </div>
                            
                    </div>
                    <div className="field">
                        <label className='label'>Keterangan</label>
                        <div className="control">
                            <textarea 
                                class="textarea" 
                                placeholder="Tulis Keterangan Pending..."
                                value={ket}
                                onChange={(e) => setKet(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className='button is-success'>
                                Save
                            </button>
                        </div>   
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FormAddProduct;
