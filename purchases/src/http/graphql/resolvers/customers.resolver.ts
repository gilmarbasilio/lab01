import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { AuthUser, CurrentUser } from '../../authorization/current-user';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private purchasesService: PurchasesService,
    private customerService: CustomerService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => Product)
  purchases(@Parent() custormer: Customer) {
    return this.purchasesService.listAllFromCustomer(custormer.id);
  }
}
