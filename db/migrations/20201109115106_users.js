//should be called create_users_table

exports.up = function(knex) {
    //console.log('creating the users table');
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.text('username').primary();
        usersTable.text('avatar_url');
        usersTable.text('name');
    })
};

exports.down = function(knex) {
    //console.log('dropping users table');
    return knex.schema.dropTable('users');
};
