enum IntranetPaths {

    //USERS
    UserFindById = "/admin/users/findById",
    UserFindByEmail = "/admin/users/findByEmail",
    UserList = '/admin/users/list',
    UserCreate = '/admin/users/create',
    UserUpdate = '/admin/users/update',
    UserDelete = '/admin/users/delete',
    UserMultipleDelete = '/admin/users/multiple-delete',

    //PLAN ATTRIBUTES
    PlanAttributeList = '/admin/plan-attributes/list',
    PlanAttributeFindById = '/admin/plan-attributes/findById',
    PlanAttributeCreate = '/admin/plan-attributes/create',
    PlanAttributeUpdate = '/admin/plan-attributes/update',
    PlanAttributeDelete = '/admin/plan-attributes/delete',
    PlanAttributeMultipleDelete = '/admin/plan-attributes/multiple-delete',

    //OPERATORS
    OperatorList = '/admin/operators/list',
    OperatorFindById = '/admin/operators/findById',
    OperatorCreate = '/admin/operators/create',
    OperatorUpdate = '/admin/operators/update',
    OperatorDelete = '/admin/operators/delete',
    OperatorMultipleDelete = '/admin/operators/multiple-delete',

    //PLAN
    PlanList = '/admin/plans/list',
    PlanFindById = '/admin/plans/findById',
    PlanCreate = '/admin/plans/create',
    PlanUpdate = '/admin/plans/update',
    PlanDelete = '/admin/plans/delete',
    PlanMultipleDelete = '/admin/plans/multiple-delete',

    //CATEGORIES
    CategoryList = '/admin/categories/list',
    CategoryFindById = '/admin/categories/findById',
    CategoryCreate = '/admin/categories/create',
    CategoryUpdate = '/admin/categories/update',
    CategoryDelete = '/admin/categories/delete',
    CategoryMultipleDelete = '/admin/categories/multiple-delete',

    //BRANDS
    BrandList = '/admin/brands/list',
    BrandFindById = '/admin/brands/findById',
    BrandCreate = '/admin/brands/create',
    BrandUpdate = '/admin/brands/update',
    BrandDelete = '/admin/brands/delete',
    BrandMultipleDelete = '/admin/brands/multiple-delete',

    //VARIATIONS
    VariationList = '/admin/variations/list',
    VariationFindById = '/admin/variations/findById',
    VariationCreate = '/admin/variations/create',
    VariationUpdate = '/admin/variations/update',
    VariationDelete = '/admin/variations/delete',
    VariationMultipleDelete = '/admin/variations/multiple-delete',

    //FEATURES
    FeatureList = '/admin/features/list',
    FeatureFindById = '/admin/features/findById',
    FeatureCreate = '/admin/features/create',
    FeatureUpdate = '/admin/features/update',
    FeatureDelete = '/admin/features/delete',
    FeatureMultipleDelete = '/admin/features/multiple-delete',

    //COMPANIES
    CompanyList = '/admin/group-companies/list',
    CompanyFindById = '/admin/group-companies/findById',
    CompanyCreate = '/admin/group-companies/create',
    CompanyUpdate = '/admin/group-companies/update',
    CompanyDelete = '/admin/group-companies/delete',
    CompanyMultipleDelete = '/admin/group-companies/multiple-delete',

    //ADVISERS
    AdvisersList = '/admin/advisers/list',
    AdvisersFindById = '/admin/advisers/findById',
    AdvisersCreate = '/admin/advisers/create',
    AdvisersUpdate = '/admin/advisers/update',
    AdvisersDelete = '/admin/advisers/delete',
    AdvisersMultipleDelete = '/admin/advisers/multiple-delete',

    //GENERAL
    GeneralFirst = '/admin/general/first',
    GeneralCreate = '/admin/general/create',
    GeneralUpdate = '/admin/general/update',

    //PRODUCTS
    ProductList = '/admin/products/list',
    ProductListSimple = '/admin/products/list/simple',
    ProductFind = '/admin/products/find',
    ProductCreate = '/admin/products/create',
    ProductUpdate = '/admin/products/update',
    ProductDelete = '/admin/products/delete',
    ProductMultipleUpdateStatus = '/admin/products/multiple-status',
    ProductUpdateStatus = '/admin/products/update/status',

    //SALETYPE
    SaleTypeList = '/admin/sales/types/list',
    SaleTypeFindById = '/admin/sales/types/findById',
    SaleTypeCreate = '/admin/sales/types/create',
    SaleTypeUpdate = '/admin/sales/types/update',
    SaleTypeDelete = '/admin/sales/types/delete',
    SaleTypeMultipleDelete = '/admin/sales/types/multiple-delete',

    //WIDGETS
    WidgetList = '/admin/widgets/list',
    WidgetFindById = '/admin/widgets/findById',
    WidgetCreate = '/admin/widgets/create',
    WidgetUpdate = '/admin/widgets/update',
    WidgetDelete = '/admin/widgets/delete',
    WidgetMultipleDelete = '/admin/widgets/multiple-delete',

    //PAGES
    PageList = '/admin/pages/list',
    PageFindById = '/admin/pages/findById',
    PageUpdate = '/admin/pages/update',

    //LOGS
    LogList = '/admin/orders/list',
    LogExportExcel = '/admin/orders/export',
}

enum ExtranetPaths {
    FindPage = '/client/pages/findByPage',
    FindWidget = '/client/widgets/findById',

    Companies = '/client/group-companies/list',
    GeneralData = '/client/general/first',

    Catalog = '/client/products/list',

    Brands = '/client/brands/list',
    Operators = '/client/operators/list',
    Categories = '/client/categories/list',

    FindProduct = '/client/products/findBySlug',

    SearchProductsByName = '/client/products/searchByName',

    FindAdviser = '/client/orders/create',
}

export class PATHS {
    static INTRANET = IntranetPaths;
    static EXTRANET = ExtranetPaths;
}
