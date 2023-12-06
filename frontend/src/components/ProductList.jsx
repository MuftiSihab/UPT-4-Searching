import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalContainer from './ModalContainer';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { IoEye, IoTrash  } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';


const ProductList = () => {

  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("")
  const [msg, setMsg] = useState("")
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, [page, keyword])

  const getProducts = async () => {
    const result = await axios.get(`http://localhost:5000/products?search_query=${keyword}&page=${page}&limit=${limit}`);
    setProduct(result.data.result)
    setPage(result.data.page)
    setPages(result.data.totalPage)
    setRows(result.data.totalRows)
  }

  const changePage = ({selected}) => {
    setPage(selected);
    if(selected === 9) {
      setMsg("Jika tidak menemukan data yang anda cari, silahkan cari dengan kata kunci spesifik")
    }else{
      setMsg("")
    }
  }

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  }

  const deleteProduct = async(productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  }

  const save = () => alert('You clicked save!')
  
  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is centered">
          <h1 className='title'>Products</h1>
          <h2 className='subtitle'>List of Products</h2>
          <form onSubmit={searchData}>
              <div className="field has-addons">
                <div className="control is-expanded">
                    <input 
                      type="text" 
                      className='input' 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder='Find Your Product'

                    />
                </div>
                <div className="control">
                  <button type='submit' className='button is-info'>Search</button>
                </div>
              </div>
          </form>
          
          <table className='table is-stripe is-bordered is-fullwidth mt-2'>
            <thead className='has-text-centered'>
                <tr>
                    <th className='has-text-centered'>No</th>
                    <th className='has-text-centered'>Nopel</th>
                    <th className='has-text-centered'>Nama</th>
                    <th className='has-text-centered'>Nop</th>
                    <th className='has-text-centered'>Penginput</th>
                    <th className='has-text-centered'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                  products.map((product, index) => (
                    <tr key={product.uuid} className='has-text-centered'>
                      <td>{index + 1}</td>
                      <td>{product.nopel}</td>
                      <td>{product.name}</td>
                      <td>{product.nop}</td>
                      <td>{product.user.name}</td>
                      <td>
                        {user && user.role === "admin" ? (
                          <Link to={`/products/edit/${product.uuid}`} className='button is-small is-info'><FaPen/></Link>
                        ) : null}

                        {user && user.role === "admin" ? (
                          <button onClick={() => deleteProduct(product.uuid)} className='button is-small is-danger'><IoTrash/></button>
                        ) : null}
                        
                        <ModalContainer
                          modalTitle= "Detail product"
                          buttonTitle={<IoEye/>}
                          save={save}
                          content={
                          <div>
                              
                              <div>
                                <div className='is-justify-content-left'>Nopel :</div>
                                <div><strong className='ml-5'>{product.nopel}</strong></div>
                              </div>
                              <div>
                                Name :
                                <strong className='ml-5'>{product.name}</strong>
                              </div>
                              <div>
                                Nop :
                                <strong className='ml-5'>{product.nop}</strong>
                              </div>
                              <div>
                                Luas Tanah :
                                <strong className='ml-5'>{product.lt}</strong>
                              </div>
                              <div>
                                Luas bangunan :
                                <strong className='ml-5'>{product.lb}</strong>
                              </div>
                              <div>
                                Kecamatan :
                                <strong className='ml-5'>{product.kec}</strong>
                              </div>
                              {/* <td>Nopel: {product.nopel}</td>
                              <td>Nama WP: {product.name}</td>
                              <td>NOP: {product.nop}</td>
                              <td>Luas Tanah: {product.lt}</td>
                              <td>Luas Bangunan: {product.lb}</td>
                              <td>Kecamatan: {product.kec}</td> */}
                              <div>
                                <p>Tahapan : 
                                </p>
                                <strong 
                                  className='has-text-primary'
                                >
                                  {product.tahapan}
                                </strong>
                              </div>
                            
                          </div>
                          }
                          step={<HorizontalLinearStepper
                            tahapan={product.tahapan}
                          />}
                        />
                      </td>
                  </tr>
                  ))
                }
            </tbody>
          </table>
          <p>Total Rows: {rows} Page: {rows ? page + 1 : 0 } of {page}</p>
          <p className='has-text-centered has-text-danger'>{msg}</p>
          <nav className="pagination is-centered" key={rows} role='navigation' aria-label='pagination'>
              <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                pageCount={Math.min(10, pages)}
                onPageChange={changePage}
                containerClassName={"pagination-list"}
                pageLinkClassName={"pagination-link"}
                previousLinkClassName={"pagination-previous"}
                nextLinkClassName={"pagination-next"}
                activeLinkClassName={"pagination-link is-current"}
                disabledLinkClassName={"pagination-link is-disabled"}
              />
          </nav>
          {user && user.role === "admin" && (
            <Link to={"/products/add"} className='button is-primary mb-2'><IoIosAddCircle/></Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList;
