﻿using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    //#29.Change POST Category Action method to use Repository
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await _dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<IEnumerable<Category>> GetAllAsync(string? query = null)
        {
            //return await _dbContext.Categories.ToListAsync();

            //Query from database
            var categories = _dbContext.Categories.AsQueryable();

            //Filtering
            if (string.IsNullOrWhiteSpace(query) == false)
            {
                categories = categories.Where(x => x.Name.Contains(query));
            }

            //Sorting

            //Pagination
            

            return await categories.ToListAsync();
        }

        public async Task<Category?> GetById(Guid id)
        {
            return await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Category?> UpdateAsync(Category category)
        {
            var existingCategory = await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id == category.Id);

            if (existingCategory != null)
            {
                _dbContext.Entry(existingCategory).CurrentValues.SetValues(category);
                await _dbContext.SaveChangesAsync();
                return category;
            }

            return null;
        }

        public async Task<Category?> DeleteAsync(Guid id)
        {
            var existingCategory = await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            
            if(existingCategory is null)
            {
                return null;
            }

            _dbContext.Categories.Remove(existingCategory);
            await _dbContext.SaveChangesAsync();
            return existingCategory;
        }
    }
}
