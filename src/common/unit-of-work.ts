/** Unit Of work
 * references:
 * @link [Martin fowler](https://www.martinfowler.com/eaaCatalog/unitOfWork.html)
 * @link [Microsoft](https://docs.microsoft.com/ko-kr/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application)
 *
 */
export interface UnitOfWork {}
export abstract class AbstractUnitOfWork implements UnitOfWork {}
