using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interface;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        // public ProductsController(IGenericRepository<Product> productRepo,
        // IGenericRepository<ProductBrand> productBrandRepo,
        // IGenericRepository<ProductType> productTypeRepo,
        // IMapper mapper)
        // {
        //     _productsRepo = productRepo;
        //     _productBrandRepo = productBrandRepo;
        //     _productTypeRepo = productTypeRepo;
        //     _mapper = mapper;
        // }

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<List<ProductToReturnDto>>>> GetProducts([FromQuery]ProductSpecParams productParams )
        {
            var spec =new ProductWithTypesAndBrandsSpecification(productParams);

            var countSpec=new ProductsWithFilterForCountSpecification(productParams);

            // var totalItems=await _productsRepo.CountAsync(countSpec);

            // var products = await _productsRepo.ListAsync(spec);

            // var data=_mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products);

            // return Ok( new Pagination<ProductToReturnDto>(productParams.PageIndex,productParams.PageSize,totalItems,data));

            

        

            var totalItems = await _unitOfWork.Repository<Product>().CountAsync(countSpec);

            var products = await _unitOfWork.Repository<Product>().ListAsync(spec);

            var data = _mapper
                .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
 

    }
        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
             var spec =new ProductWithTypesAndBrandsSpecification(id);
          
                      

            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
 


        }

      
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
         return Ok(await _unitOfWork.Repository<ProductBrand>().ListAllAsync());
 
        }

       [Cached(1000)]
       [HttpGet("Types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _unitOfWork.Repository<ProductType>().ListAllAsync());
 
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Product>> CreateProduct(ProductToCreateDto productToCreate)
        {
            var product = _mapper.Map<ProductToCreateDto, Product>(productToCreate);
            product.PictureUrl = "images/products/placeholder.png";

            _unitOfWork.Repository<Product>().Add(product);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating product"));

            return Ok(product);
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, ProductToCreateDto productToUpdate)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);

            productToUpdate.PictureUrl = product.PictureUrl;
            
            _mapper.Map(productToUpdate, product);

            _unitOfWork.Repository<Product>().Update(product);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating product"));

            return Ok(product);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
            
            _unitOfWork.Repository<Product>().Delete(product);

            var result = await _unitOfWork.Complete();
            
            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting product"));

            return Ok();
        }

 
    }
}