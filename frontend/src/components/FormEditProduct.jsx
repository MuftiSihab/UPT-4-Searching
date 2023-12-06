import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams} from 'react-router-dom';

const FormEditProduct = () => {

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
    const {id} = useParams();

    useEffect(() => {
        const getProductById = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`)
                setNopel(response.data.nopel)
                setName(response.data.name)
                setNop(response.data.nop)
                setLt(response.data.lt)
                setLb(response.data.lb)
                setKec(response.data.kec)
                setTahapan(response.data.tahapan)
                setKet(response.data.ket)
            } catch (error) {
                if(error.response) {
                    setMsg(error.response.data.msg)
                }
            }
        }
        getProductById();
    }, [id])

    const updateProduct = async(e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, {
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
      <h2 className='subtitle'>Edit Products</h2>
      <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
            <form onSubmit={updateProduct}>
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
                        <label className='label'>
                            Tahapan <p className='has-text-info'>*{tahapan}*</p>
                        </label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select 
                                    value={tahapan}
                                    onChange={(e) => setTahapan(e.target.value)}
                                >
                                    <option value="pembuatan nopel">Pembuatan Nopel</option>
                                    <option value="pemeriksaan pendata">Pemeriksaan Pendata</option>
                                    <option value="pengiriman ke badan">Pengiriman Ke Badan</option>
                                    <option value="SPPT jadi">SPPT Jadi</option>
                                    <option value="Pending">Pending</option>
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
                                Update
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

export default FormEditProduct;