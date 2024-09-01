import { IBlog } from "./blog.interface";
import SingleBlog from "./components/single-blog";

export default function BlogDesign({ blogs }: { blogs: IBlog[] }) {

    return (
        <>
            {/* <Header toggle={toggle} isVisible={true} handleSearch={handleSearch}></Header>
            <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown> */}
            <div className="flex justify-center">
                <div className="flex justify-center">
                    {/* {
                        isLoading && <Loader />
                    } */}
                    {/* {
                        !isLoading && !blogs.length && <h3 className="text-red-500 text-center mt-3">No Blogs Found.</h3>
                    } */}
                    <div className="lg:grid lg:grid-cols-3 lg:px-12 sm:px-2">
                        {
                            blogs?.map(blog => <div>
                                <SingleBlog blog={blog}></SingleBlog>
                            </div>)
                        }
                    </div>
                </div>
            </div>

            {/* <div className='text-right p-8'>
                <span>Total: <b>{resPagination.totalIndex || 0}</b></span>
                <span className='mx-2'>Current Page: <b>{resPagination.currentPage || 0}</b></span>
                <input className='border-2 mx-2 w-16' defaultValue={pagination.limit} onBlur={(e) => setPagination({ ...pagination, limit: (e.target.value > 1 && e.target.value <= 100) ? Number(e.target.value) : 10 })} />

                <button className='border-0 mx-2' onClick={() => setPagination({ ...pagination, page: pagination.page > 1 ? pagination.page - 1 : 1 })}>Prev</button>
                <button className='border-0 mx-2' onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}>Next</button>
            </div> */}
        </>
    );
}
