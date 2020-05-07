<?php

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/** 
 * @ORM\Entity 
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="Feature", mappedBy="product")
     */
    private $features;
    // ...

    public function __construct()
    {
        $this->features = new ArrayCollection();
    }
}

/** 
 * @ORM\Entity 
 */
class Feature
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Product", inversedBy="features")
     */
    private $product;
}
